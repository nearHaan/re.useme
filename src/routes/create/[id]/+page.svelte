<script lang="ts">
	import BioCreateSection from '$lib/components/bio-create-section.svelte';
	import type { DetailsTemplateType, LoadedData } from '$lib/types';

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
						Company: 'Facebook',
						'Date of Joining': 'January, 2025',
						Till: '',
						Description: ''
					},
					{
						'Job Title': 'Yeyy',
						Company: 'Facebook',
						'Date of Joining': 'January, 2025',
						Till: '',
						Description: ''
					}
				]
			}
		}
	});
</script>

<div class="flex h-full bg-darkerBg">
	<div class="no-scrollbar flex h-full w-full max-w-120 overflow-y-auto bg-background p-sm">
		{#if detailsTemplate.state === 'success'}
			<div class="flex h-full w-full flex-col gap-sm">
				<div class="flex flex-col">
					<h2>One more step...</h2>
					<p>Select the details to be included in the Resume</p>
				</div>
				{#each Object.entries(detailsTemplate.data.template) as [section, components]}
					<BioCreateSection
						title={section}
						userDetails={detailsTemplate.data.userDetails}
						{components}
						selectedData={{}}
					/>
				{/each}
			</div>
		{/if}
	</div>
	<div class="w-full max-md:hidden">//</div>
</div>
