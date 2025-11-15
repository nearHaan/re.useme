<script lang="ts">
	import type { DetailsTemplateType } from '$lib/types';
	import TemplateSubComp from './template-sub-comp.svelte';

	const {
		subComponents
	}: {
		subComponents: DetailsTemplateType['']['subComponents'];
	} = $props();
</script>

<div class="flex grid-cols-2 flex-col gap-sm border-2 border-darkerBg p-sm lg:grid">
	{#each Object.entries(subComponents) as [title, meta]}
		<TemplateSubComp {title} type={meta.type} example={meta.example} />
	{/each}
</div>
