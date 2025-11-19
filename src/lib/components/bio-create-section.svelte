<script lang="ts">
	import CheckboxBtn from './checkbox-btn.svelte';

	let {
		title,
		components,
		selectedData = $bindable({})
	}: { title: String; components: Array<object>; selectedData: object } = $props();
</script>

<div class="flex flex-col rounded-sm border-2 border-darkerBg">
	<h3 class="bg-darkerBg p-xs">{title}</h3>
	<div class="flex flex-col gap-y-xs p-xs">
		{#each Object.entries(components) as [component, value]}
			<div class="flex items-center rounded-sm bg-darkBg p-xs">
				<div class="flex w-full flex-col">
					<p class="text-xs">{component}</p>
					<p>{value}</p>
				</div>
				<CheckboxBtn isChecked={false} />
			</div>
		{/each}
	</div>
</div>
