<script lang="ts">
	import type { DetailsTemplateItem, DetailsTemplateType } from '$lib/types';
	import { onMount } from 'svelte';
	import CheckboxBtn from './checkbox-btn.svelte';
	import CreateSubComp from './create-sub-comp.svelte';

	let {
		title,
		components,
		userDetails,
		selectedData = $bindable({})
	}: {
		title: string;
		components: DetailsTemplateItem;
		userDetails: Record<string, any>;
		selectedData: object;
	} = $props();
</script>

<div class="flex flex-col rounded-sm border-2 border-darkerBg">
	<h3 class="bg-darkerBg p-xs">{title}</h3>
	<div class="flex flex-col gap-y-xs p-xs">
		{#if components.meta.type === 'single'}
			{#each Object.entries(components.subComponents) as [component, value]}
				<div class="flex items-center rounded-sm bg-darkBg p-xs">
					<CreateSubComp
						title={component}
						type={components.subComponents[component].type}
						value={userDetails[title][component]}
					/>
					<CheckboxBtn isChecked={false} />
				</div>
			{/each}
		{:else}
			{#each userDetails[title] as item, i}
				<div class="flex flex-col gap-y-xs border-2 border-darkerBg">
					<div class="flex w-full justify-between bg-darkerBg p-xs">
						<p>{i + 1}</p>
						<CheckboxBtn isChecked={false} />
					</div>
					<div class="grid grid-cols-2 gap-xs p-xs">
						{#each Object.entries(components.subComponents) as [component, value]}
							{#if userDetails[title][i][component]}
								<CreateSubComp
									title={component}
									type={components.subComponents[component].type}
									value={userDetails[title][i][component]}
								/>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
