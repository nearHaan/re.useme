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
				'692740f422209091d5df45be': {
					title: 'Personal Info',
					meta: {
						desc: 'Enter your personal details',
						type: 'single'
					},
					subComponents: {
						'6927513e731ac7ff646b3ce0': {
							title: 'Your photo',
							type: 'photo',
							example: ''
						},
						'692750c0731ac7ff646b3cd5': {
							title: 'First Name',
							type: 'text',
							example: 'Farhaan'
						},
						'692750ce731ac7ff646b3cd8': {
							title: 'Last Name',
							type: 'text',
							example: 'Farhaan'
						},
						'69275125731ac7ff646b3cdd': {
							title: 'About',
							type: 'text-area',
							example: 'I am awesome'
						}
					}
				},
				'6927415d22209091d5df45c3': {
					title: 'Experience',
					meta: {
						desc: 'Enter your internships, career experiences',
						type: 'list'
					},
					subComponents: {}
				},
				'6927417d22209091d5df45c5': {
					title: 'Skills',
					meta: {
						desc: 'Your top strengths',
						type: 'list'
					},
					subComponents: {}
				}
			},
			userDetails: {
				'692740f422209091d5df45be': {
					'6927513e731ac7ff646b3ce0':
						'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
					'692750c0731ac7ff646b3cd5': 'Farhaan',
					'692750ce731ac7ff646b3cd8': 'Nizam',
					'69275125731ac7ff646b3cdd': 'buhahahahah'
				},
				'6927415d22209091d5df45c3': []
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
			{#each Object.entries(detailsTemplate.data.template) as [key, value]}
				<BioSectionBtn title={value.title} onClick={onSectionClick} isActive={false} />
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
			class="absolute inset-0 z-20 flex justify-center bg-transparent-black pt-navbar-height"
		>
			<div class="z-30 mx-sm mt-sm h-min w-full rounded-md bg-white p-sm">
				{#if detailsTemplate.state === 'success'}
					{#each Object.entries(detailsTemplate.data.template) as [key, value]}
						<BioSectionBtn title={value.title} onClick={onSectionClick} isActive={false} />
					{/each}
				{/if}
			</div>
		</div>
	{/if}
	{#if detailsTemplate.state === 'success' && activeSectionKey}
		<div class="flex h-full w-full flex-col bg-background p-sm">
			<h3 class="max-md:hidden">{detailsTemplate.data.template[activeSectionKey].title}</h3>
			<div
				onclick={() => {
					showSections = true;
				}}
				onkeydown={(e) => {}}
				tabindex="0"
				role="button"
				class="mb-sm flex w-full items-center justify-between rounded-md bg-darkBg p-sm text-text md:hidden"
			>
				<h3 class="">{detailsTemplate.data.template[activeSectionKey].title}</h3>
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
