<script lang="ts">
	import type { DetailsTemplateType } from '$lib/types';
	import TemplateSubComp from './template-sub-comp.svelte';

	let {
		subComponents,
		bindVariable = $bindable({})
	}: {
		subComponents: DetailsTemplateType['']['subComponents'];
		bindVariable: any;
	} = $props();
</script>

<div class="flex grid-cols-2 flex-col gap-sm border-2 border-darkerBg p-sm lg:grid">
	{#each Object.entries(subComponents) as [title, meta]}
		<TemplateSubComp {title} bind:bindVariable type={meta.type} example={meta.example} />
	{/each}
</div>
