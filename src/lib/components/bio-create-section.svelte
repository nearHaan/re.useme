<script lang="ts">
	import type { DetailsTemplateType } from '$lib/types';
	import CheckboxBtn from './checkbox-btn.svelte';
	import CreateSubComp from './create-sub-comp.svelte';

	let {
		key,
		title,
		type,
		components,
		userDetails,
		selectedData = $bindable({})
	}: {
		key: string;
		title: string;
		type: 'single' | 'list';
		components: DetailsTemplateType['']['subComponents'];
		userDetails: Record<string, any>;
		selectedData: object;
	} = $props();
</script>

<div class="flex flex-col rounded-sm border-2 border-darkerBg">
	<h3 class="bg-darkerBg p-xs">{title}</h3>
	<div class="flex flex-col gap-y-xs p-xs">
		{#if type === 'single'}
			{#each Object.entries(components) as [id, component]}
				<div class="flex items-center rounded-sm bg-darkBg p-xs">
					<CreateSubComp
						title={component.title}
						type={component.type}
						value={userDetails[key][0][id]}
					/>
					<CheckboxBtn isChecked={false} />
				</div>
			{/each}
		{:else}
			{#each userDetails[key] as item, i}
				<div class="flex flex-col gap-y-xs border-2 border-darkerBg">
					<div class="flex w-full justify-between bg-darkerBg p-xs">
						<p>{i + 1}</p>
						<CheckboxBtn isChecked={false} />
					</div>
					<div class="grid grid-cols-2 gap-xs p-xs">
						{#each Object.entries(components) as [id, component]}
							{#if userDetails[key][i]}
								<CreateSubComp
									title={component.title}
									type={component.type}
									value={userDetails[key][i][id]}
								/>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
