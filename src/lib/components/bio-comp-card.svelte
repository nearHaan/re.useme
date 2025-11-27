<script lang="ts">
	import type { DetailsTemplateType } from '$lib/types';
	import TemplateSubComp from './template-sub-comp.svelte';

	let {
		parentId,
		index,
		subComponents,
		bindVariable = $bindable({}),
		fallbackFunc
	}: {
		parentId: string;
		index: number;
		subComponents: DetailsTemplateType['']['subComponents'];
		bindVariable: any;
		fallbackFunc: Function;
	} = $props();
</script>

<div class="flex w-full grid-cols-2 flex-col gap-sm border-2 border-darkerBg p-sm lg:grid">
	{#each Object.entries(subComponents) as [key, meta]}
		<TemplateSubComp
			title={meta.title}
			{parentId}
			{index}
			childId={key}
			bind:bindVariable
			type={meta.type}
			example={meta.example}
			{fallbackFunc}
		/>
	{/each}
</div>
