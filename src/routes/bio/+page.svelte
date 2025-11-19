<script lang="ts">
	import BioCompCard from '$lib/components/bio-comp-card.svelte';
	import BioSectionBtn from '$lib/components/bio-section-btn.svelte';
	import type { DetailsTemplateType, LoadedData } from '$lib/types';
	import { ChevronDown, Trash } from 'lucide-svelte';

	type BioDataType = {
		template: DetailsTemplateType;
		userDetails: Record<string, any>;
	};

	let detailsTemplate: LoadedData<BioDataType> = $state({
		state: 'success',
		data: {
			template: {
				'Personal Info': {
					meta: {
						desc: 'Enter your personal info',
						type: 'single' // list || single
					},
					subComponents: {
						'Your Photo': {
							type: 'photo',
							example: ''
						},
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
				},
				Skills: {
					meta: {
						type: 'list',
						desc: 'Your top skills'
					},
					subComponents: {
						Name: {
							type: 'text',
							example: 'Singing'
						}
					}
				}
			},
			userDetails: {
				'Personal Info': {
					'Your Photo':
						'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
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
			}
		}
	});
	let activeSectionKey = $state<string>('');

	$effect(() => {
		if (detailsTemplate.state === 'success') {
			activeSectionKey = Object.keys(detailsTemplate.data.template)[0];
		}
	});

	let showSections = $state(false);
	function onSectionClick(key: string) {
		activeSectionKey = key;
	}
</script>

<div class="flex h-full bg-darkerBg">
	<div class="flex h-full w-100 flex-col gap-sm p-sm max-md:hidden">
		{#if detailsTemplate.state === 'success'}
			{#each Object.keys(detailsTemplate.data.template) as key}
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
					{#each Object.keys(detailsTemplate.data.template) as key}
						<BioSectionBtn title={key} onClick={onSectionClick} isActive={false} />
					{/each}
				{/if}
			</div>
		</div>
	{/if}
	{#if detailsTemplate.state === 'success' && activeSectionKey}
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
			<p class="mb-sm">{detailsTemplate.data.template[activeSectionKey].meta.desc}</p>
			{#if detailsTemplate.data.template[activeSectionKey].meta.type === 'single'}
				<div class="overflow-auto">
					<BioCompCard
						subComponents={detailsTemplate.data.template[activeSectionKey].subComponents}
						bind:bindVariable={detailsTemplate.data.userDetails[activeSectionKey]}
					/>
				</div>
				<!-- list type -->
			{:else}
				<div class="flex w-full flex-col items-start gap-y-sm overflow-auto">
					{#each detailsTemplate.data.userDetails[activeSectionKey] as item, i}
						<div class="flex w-full max-md:flex-col">
							<BioCompCard
								subComponents={detailsTemplate.data.template[activeSectionKey].subComponents}
								bind:bindVariable={detailsTemplate.data.userDetails[activeSectionKey][i]}
							/>
							<div
								class="flex h-full items-start justify-center bg-darkerBg p-xs max-md:w-full max-md:justify-end"
							>
								<button
									onclick={() => {
										(detailsTemplate.data.userDetails[activeSectionKey] as Array<Object>).splice(
											i,
											1
										);
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
							const sample = Object.keys(
								detailsTemplate.data.template[activeSectionKey].subComponents
							);
							console.log(sample);
							if (
								detailsTemplate.data.userDetails[activeSectionKey] === undefined ||
								detailsTemplate.data.userDetails[activeSectionKey] === null
							) {
								detailsTemplate.data.userDetails[activeSectionKey] = new Array<
									Record<string, string>
								>();
							}
							(
								detailsTemplate.data.userDetails[activeSectionKey] as Array<Record<string, string>>
							).push(
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
						console.log($state.snapshot(detailsTemplate.data.userDetails));
					}}
					class="btn-primary"
				>
					Save & Next
				</button>
			</div>
		</div>
	{/if}
</div>
