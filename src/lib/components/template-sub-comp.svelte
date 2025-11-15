<script lang="ts">
	import type { TemplateSubComponent } from '$lib/types';

	const {
		title,
		type,
		example
	}: {
		title: string;
		type: TemplateSubComponent['type'];
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
	<div class="mb-sm flex w-full flex-col">
		<p class="text-xs">{title}</p>
		<input {type} placeholder={example} class="text-md w-full rounded-md bg-darkBg p-xs" />
	</div>
{/if}

{#if type === 'text-area'}
	<div class="col-span-2 mb-sm flex w-full flex-col">
		<p class="text-xs">{title}</p>
		<textarea placeholder={example} class="text-md min-h-40 w-full rounded-md bg-darkBg p-xs"
		></textarea>
	</div>
{/if}

{#if type === 'date'}
	<div class="mb-sm flex gap-x-sm">
		<div class="flex w-full flex-col">
			<p class="text-xs">Month</p>
			<select placeholder="January" class="text-md w-full rounded-md bg-darkBg p-xs">
				{#each months as month}
					<option value={month}>{month}</option>
				{/each}
			</select>
		</div>
		<div class="flex w-full flex-col">
			<p class="text-xs">Year</p>
			<input type="number" placeholder="2025" class="text-md w-full rounded-md bg-darkBg p-xs" />
		</div>
	</div>
{/if}
