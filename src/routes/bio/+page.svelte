<script lang="ts">
	import BioCompCard from '$lib/components/bio-comp-card.svelte';
	import BioSectionBtn from '$lib/components/bio-section-btn.svelte';
	import TemplateSubComp from '$lib/components/template-sub-comp.svelte';
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
				<BioCompCard subComponents={detailsTemplate.data[activeSectionKey].subComponents} />
				<!-- list type -->
			{:else}
				<div class="flex flex-col items-start">
					<div class="flex">
						<BioCompCard subComponents={detailsTemplate.data[activeSectionKey].subComponents} />
						<div class="flex h-full items-center justify-center">
							<button class="cursor-pointer bg-darkBg px-sm text-text">
								<Trash />
							</button>
						</div>
					</div>
					<button class="w-fit py-xs font-semibold text-secondary">Add {activeSectionKey}</button>
				</div>
			{/if}
			<div class="mt-sm flex items-center justify-between">
				<button class="btn-secondary"> Previous </button>
				<button class="btn-primary"> Save & Next </button>
			</div>
		</div>
	{/if}
</div>
