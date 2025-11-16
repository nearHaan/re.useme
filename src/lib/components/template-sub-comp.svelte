<script lang="ts">
	import type { TemplateSubComponent } from '$lib/types';

	let {
		title,
		type,
		bindVariable = $bindable({}),
		example
	}: {
		title: string;
		type: TemplateSubComponent['type'];
		bindVariable: any;
		example: string;
	} = $props();

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let showFileBanner = $state(false);
	let file: File | null = $state(null);
	const onFile = (e: Event) => {
		const input = e.target as HTMLInputElement;
		file = input.files?.[0] ?? null;

		if (file) {
			bindVariable[title] = URL.createObjectURL(file);
		}
	};

	function onUpload() {
		if (!file) {
			return alert('Choose a file first');
		}
		if (true) {
			file = null;
			showFileBanner = true;
			setTimeout(() => {
				showFileBanner = false;
			}, 2000);
		}
	}
</script>

{#if type === 'text' || type === 'email' || type === 'number'}
	<div class="flex w-full flex-col">
		<p class="text-xs">{title}</p>
		<input
			{type}
			bind:value={bindVariable[title]}
			onchange={(e: Event) => {
				bindVariable[title] = (e.target as HTMLInputElement).value;
			}}
			placeholder={example}
			class="input-primary"
		/>
	</div>
{/if}

{#if type === 'text-area'}
	<div class="col-span-2 flex w-full flex-col">
		<p class="text-xs">{title}</p>
		<textarea
			placeholder={example}
			bind:value={bindVariable[title]}
			onchange={(e: Event) => {
				bindVariable[title] = (e.target as HTMLInputElement).value;
			}}
			class="input-primary min-h-40"
		></textarea>
	</div>
{/if}

{#if type === 'date'}
	<div class="flex flex-col">
		<p class="text-xs">{title}</p>
		<div class="flex gap-x-sm">
			<select
				bind:value={bindVariable[title]}
				onchange={(e: Event) => {
					bindVariable[title] = (e.target as HTMLInputElement).value;
				}}
				placeholder="January"
				class="input-primary"
			>
				{#each months as month}
					<option value={month}>{month}</option>
				{/each}
			</select>
			<input type="number" placeholder="2025" class="input-primary" />
		</div>
	</div>
{/if}

{#if type === 'photo'}
	<div class="col-span-2 flex w-full gap-x-sm">
		<div class="flex w-full items-center justify-center">
			<div class="aspect-7/9 h-40 overflow-hidden border-1 border-darkerBg bg-darkBg">
				<img alt="photo" src={bindVariable[title]} />
			</div>
		</div>
		<div class="flex h-full w-full flex-col">
			<p class="mb-sm text-xs">{title}</p>
			<div class="flex gap-xs max-md:flex-col">
				<input
					type="file"
					accept="image/*"
					onchange={onFile}
					class="btn-secondary w-full text-xs"
				/>
				{#if file}
					<button onclick={onUpload} class="btn-primary w-fit text-xs">Upload</button>
				{/if}
			</div>
			{#if showFileBanner}
				<div class="mt-xs w-fit rounded-md bg-green-100 p-xs">
					<p class="text-left text-xs text-green-500">Photo uploaded successfully</p>
				</div>
			{/if}
			<p class="mt-xs text-xs text-red-500">Photo of size should be less than 100KB</p>
		</div>
	</div>
{/if}
