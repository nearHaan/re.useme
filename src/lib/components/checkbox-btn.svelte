<script lang="ts">
	import { LucideCheck } from 'lucide-svelte';
	let {
		parentId,
		index,
		childId,
		selectedData = $bindable({}),
		userDetails
	}: {
		parentId: string;
		index: number;
		childId: string;
		selectedData: Record<string, Record<string, string>[]>;
		userDetails: Record<string, Record<string, string>[]>;
	} = $props();
</script>

<button
	onclick={() => {
		selectedData[parentId][index][childId] = selectedData[parentId][index][childId]
			? ''
			: userDetails[parentId][index][childId];
	}}
	class="flex h-5 w-5 items-center justify-center rounded-full border border-text {selectedData[
		parentId
	][index][childId]
		? 'bg-green-400'
		: 'bg-background'} p-xxxs text-text"
>
	{#if selectedData[parentId][index][childId]}
		<LucideCheck />
	{/if}
</button>
