<script lang="ts">
	import type { TemplateSubComponent } from '$lib/types';

	let {
		title,
		type,
		value
	}: {
		title: string;
		type: TemplateSubComponent['type'];
		value: string;
	} = $props();
</script>

{#if type === 'text' || type === 'email' || type === 'number'}
	<div class="flex w-full flex-col">
		<p class="text-xs">{title}</p>
		<p>{value}</p>
	</div>
{/if}

{#if type === 'text-area'}
	<div class="col-span-2 flex w-full flex-col">
		<p class="text-xs">{title}</p>
		<p>{value}</p>
	</div>
{/if}

{#if type === 'date'}
	<div class="flex flex-col">
		<p class="text-xs">{title}</p>
		<p>{value}</p>
	</div>
{/if}

{#if type === 'photo'}
	<div class="col-span-2 flex w-full gap-x-sm">
		<div class="flex w-full items-center justify-center">
			<div class="aspect-7/9 h-40 overflow-hidden border border-darkerBg bg-darkBg">
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img alt="photo" src={value} />
			</div>
		</div>
	</div>
{/if}
