<script lang="ts">
	import BioCompCard from '$lib/components/bio-comp-card.svelte';
	import BioSectionBtn from '$lib/components/bio-section-btn.svelte';
	import type { DetailsTemplateType, LoadedData } from '$lib/types';
	import { ChevronDown, Trash } from 'lucide-svelte';

	let detailsTemplate: LoadedData<DetailsTemplateType> = {
		state: 'success',
		data: {
			'Personal Info': {
				meta: {
					desc: 'Enter your personal info',
					type: 'single' // list || single
				},
				subComponents: {
					'First Name': {
						type: 'text',
						example: 'Farhaan'
					},
					'Last Name': {
						type: 'text',
						example: 'Nizam'
					},
					About: {
						type: 'text-area',
						example: 'I am awesome'
					}
				}
			},
			Experience: {
				meta: {
					desc: 'Description',
					type: 'list' // list || single
				},
				subComponents: {
					'Job Title': {
						type: 'text',
						example: 'CEO'
					},
					Company: {
						type: 'text',
						example: 'Meta'
					},
					'Date of Joining': {
						type: 'date',
						example: 'January 2025'
					},
					Till: {
						type: 'date',
						example: 'January 2025'
					},
					Description: {
						type: 'text-area',
						example: 'Awesome job'
					}
				}
			}
		}
	};

	const fetchedDetails = {
		'Personal Info': {
			'First Name': 'Farhaan',
			'Last Name': 'Nizam',
			About: 'buhahahahah'
		},
		Experience: [
			{
				'Job Title': 'Yeyy',
				Company: '',
				'Date of Joining': '',
				Till: '',
				Description: ''
			}
		]
	};

	let userDetails = $state<Record<string, any>>(fetchedDetails);
	let activeSectionKey = $state<string>(Object.keys(detailsTemplate.data)[0]);

	let showSections = $state(false);
	function onSectionClick(key: string) {
		activeSectionKey = key;
	}
</script>

<!-- TODO: Fix navbar body layout issue. Currently done on hardcoded padding values -->
<div class="flex h-full bg-darkerBg">
	<div class="flex h-full w-100 flex-col gap-sm p-sm max-md:hidden">
		{#if detailsTemplate.state === 'success'}
			{#each Object.keys(detailsTemplate.data) as key}
				<BioSectionBtn title={key} onClick={onSectionClick} isActive={false} />
			{/each}
		{/if}
	</div>
	{#if showSections}
		<div
			role="button"
			tabindex="0"
			onclick={() => {
				showSections = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					showSections = false;
				}
			}}
			class="absolute inset-0 z-20 flex justify-center bg-transparent-black pt-16"
		>
			<div class="z-30 mx-sm mt-sm h-min w-full rounded-md bg-white p-sm">
				{#if detailsTemplate.state === 'success'}
					{#each Object.keys(detailsTemplate.data) as key}
						<BioSectionBtn title={key} onClick={onSectionClick} isActive={false} />
					{/each}
				{/if}
			</div>
		</div>
	{/if}
	{#if detailsTemplate.state === 'success'}
		<div class="flex h-full w-full flex-col bg-background p-sm">
			<h3 class="max-md:hidden">{activeSectionKey}</h3>
			<div
				onclick={() => {
					showSections = true;
				}}
				onkeydown={(e) => {}}
				tabindex="0"
				role="button"
				class="mb-sm flex w-full items-center justify-between rounded-md bg-darkBg p-sm text-text md:hidden"
			>
				<h3 class="">{activeSectionKey}</h3>
				<ChevronDown />
			</div>
			<p class="mb-sm">{detailsTemplate.data[activeSectionKey].meta.desc}</p>
			{#if detailsTemplate.data[activeSectionKey].meta.type === 'single'}
				<BioCompCard
					subComponents={detailsTemplate.data[activeSectionKey].subComponents}
					bind:bindVariable={userDetails[activeSectionKey]}
				/>
				<!-- list type -->
			{:else}
				<div class="flex w-full flex-col items-start gap-y-sm overflow-auto">
					{#each userDetails[activeSectionKey] as item, i}
						<div class="flex w-full max-md:flex-col">
							<BioCompCard
								subComponents={detailsTemplate.data[activeSectionKey].subComponents}
								bind:bindVariable={userDetails[activeSectionKey][i]}
							/>
							<div
								class="flex h-full items-start justify-center bg-darkerBg p-xs max-md:w-full max-md:justify-end"
							>
								<button
									onclick={() => {
										(userDetails[activeSectionKey] as Array<Object>).splice(i, 1);
									}}
									class="flex cursor-pointer items-center justify-center rounded-md bg-red-200 p-xs text-text"
								>
									<Trash />
								</button>
							</div>
						</div>
					{/each}
					<button
						onclick={() => {
							const sample = Object.keys(detailsTemplate.data[activeSectionKey].subComponents);
							userDetails[activeSectionKey].push(
								sample.reduce((acc: Record<string, string>, key: string) => {
									acc[key] = '';
									return acc;
								}, {})
							);
						}}
						class="w-fit py-xs font-semibold text-secondary">Add {activeSectionKey}</button
					>
				</div>
			{/if}
			<div class="mt-sm flex items-center justify-between">
				<button class="btn-outlined"> Previous </button>
				<button
					onclick={() => {
						console.log($state.snapshot(userDetails));
					}}
					class="btn-primary"
				>
					Save & Next
				</button>
			</div>
		</div>
	{/if}
</div>
