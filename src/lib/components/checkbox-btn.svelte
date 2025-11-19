<script lang="ts">
	import { LucideCheck } from 'lucide-svelte';
	let { isChecked = $bindable(false) }: { isChecked: Boolean } = $props();
</script>

<button
	onclick={() => {
		isChecked = !isChecked;
	}}
	class="flex h-5 w-5 items-center justify-center rounded-full border border-text bg-green-400 p-xxxs text-text"
>
	{#if isChecked}
		<LucideCheck />
	{/if}
</button>
