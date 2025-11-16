<script lang="ts">
	import type { TemplateSubComponent } from '$lib/types';
	import { FormInput } from 'lucide-svelte';

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
			<div class="aspect-7/9 h-40 bg-darkBg">
				<img alt="photo" src="/" />
			</div>
		</div>
		<div class="flex h-full w-full flex-col">
			<p class="mb-sm text-xs">{title}</p>
			<button class="btn-primary w-min text-xs">Upload</button>
			<p class="mt-xs text-xs text-red-500">Photo of size should be less than 100KB</p>
		</div>
	</div>
{/if}
