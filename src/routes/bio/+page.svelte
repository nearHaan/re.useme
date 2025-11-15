<script lang="ts">
	import BioCompCard from '$lib/components/bio-comp-card.svelte';
	import BioSectionBtn from '$lib/components/bio-section-btn.svelte';
	import type { DetailsTemplateType, LoadedData } from '$lib/types';
	import { Trash } from 'lucide-svelte';

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

	function onSectionClick(key: string) {
		activeSectionKey = key;
	}
</script>

<div class="flex h-full w-full bg-darkerBg">
	<div class="flex h-full w-100 flex-col gap-sm p-sm">
		{#if detailsTemplate.state === 'success'}
			{#each Object.keys(detailsTemplate.data) as key}
				<BioSectionBtn title={key} onClick={onSectionClick} isActive={false} />
			{/each}
		{/if}
	</div>
	{#if detailsTemplate.state === 'success'}
		<div class="flex h-full w-full flex-col bg-background p-sm">
			<h3>{activeSectionKey}</h3>
			<p class="mb-sm">{detailsTemplate.data[activeSectionKey].meta.desc}</p>
			{#if detailsTemplate.data[activeSectionKey].meta.type === 'single'}
				<BioCompCard
					subComponents={detailsTemplate.data[activeSectionKey].subComponents}
					bind:bindVariable={userDetails[activeSectionKey]}
				/>
				<!-- list type -->
			{:else}
				<div class="flex flex-col items-start gap-y-sm overflow-auto">
					{#each userDetails[activeSectionKey] as item, i}
						<div class="flex">
							<BioCompCard
								subComponents={detailsTemplate.data[activeSectionKey].subComponents}
								bind:bindVariable={userDetails[activeSectionKey][i]}
							/>
							<div class="flex h-full items-center justify-center">
								<button class="cursor-pointer bg-darkBg px-sm text-text">
									<Trash />
								</button>
							</div>
						</div>
					{/each}
					<button
						onclick={() => {
							// const sample = Object.keys(userDetails[activeSectionKey][0]);
							// userDetails[activeSectionKey].push(Object.keys(userDetails[activeSectionKey][0]).reduce((acc, key) => {
							// 	acc[key] = '';
							// 	return acc;
							// }, {}));
						}}
						class="w-fit py-xs font-semibold text-secondary">Add {activeSectionKey}</button
					>
				</div>
			{/if}
			<div class="mt-sm flex items-center justify-between">
				<button class="btn-secondary"> Previous </button>
				<button
					onclick={() => {
						console.log(userDetails);
					}}
					class="btn-primary"
				>
					Save & Next
				</button>
			</div>
		</div>
	{/if}
</div>
