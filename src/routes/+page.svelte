<script lang="ts">
	import ResumeProjectCard from '$lib/components/resume-project-card.svelte';
	import TemplatePreview from '$lib/components/template-preview.svelte';
	import type { LoadedData, TemplateThumbnailType } from '$lib/types';

	const fetchedDetails: TemplateThumbnailType[] = [
		{
			id: '123',
			title: 'Professional',
			thumbnail: '',
			template: {}
		},
		{
			id: '456',
			title: 'Classic',
			thumbnail: '',
			template: {}
		},
		{
			id: '123',
			title: 'Professional',
			thumbnail: '',
			template: {}
		},
		{
			id: '456',
			title: 'Classic',
			thumbnail: '',
			template: {}
		},
		{
			id: '123',
			title: 'Professional',
			thumbnail: '',
			template: {}
		},
		{
			id: '456',
			title: 'Classic',
			thumbnail: '',
			template: {}
		},
		{
			id: '123',
			title: 'Professional',
			thumbnail: '',
			template: {}
		},
		{
			id: '456',
			title: 'Classic',
			thumbnail: '',
			template: {}
		},
		{
			id: '123',
			title: 'Professional',
			thumbnail: '',
			template: {}
		},
		{
			id: '456',
			title: 'Classic',
			thumbnail: '',
			template: {}
		}
	];
	let availableTemplates: LoadedData<TemplateThumbnailType[]> = {
		state: 'success',
		data: fetchedDetails
	};
</script>

<div class="no-scrollbar flex h-full flex-col">
	<div class="m-0 flex flex-col bg-background p-sm">
		<h2>Create a new Resume</h2>
		<p class="text-text3">Templates</p>
		{#if availableTemplates.state === 'success'}
			<div class="flex justify-center">
				<div
					class="no-scrollbar mt-sm grid w-fit grid-cols-2 gap-md overflow-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
				>
					{#each availableTemplates.data as template}
						<TemplatePreview
							id={template.id}
							title={template.title}
							thumbnail={template.thumbnail}
							onClick={() => {}}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<!-- <div class="/bg-darkBg h-full bg-darkerBg p-sm">
		<h2>Saved Resumes</h2>
		<div class="mt-sm flex flex-wrap gap-sm">
			{#each availableTemplates.data as template}
				<ResumeProjectCard />
			{/each}
		</div>
	</div> -->
</div>
