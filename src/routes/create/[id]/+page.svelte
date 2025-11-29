<script lang="ts">
	import { getResumeData } from '$lib/api/resume';
	import BioCreateSection from '$lib/components/bio-create-section.svelte';
	import type { LoadedData, ResumeDataType } from '$lib/types';
	import { onMount } from 'svelte';

	let detailsTemplate: LoadedData<ResumeDataType> = $state({
		state: 'pending',
		message: 'Loading template'
	});
	let selectedData = $state({});

	onMount(async () => {
		try {
			detailsTemplate = {
				state: 'success',
				data: await getResumeData()
			};
			selectedData = JSON.parse(JSON.stringify(detailsTemplate.data.userDetails));
		} catch (err: any) {
			console.error(err);
			detailsTemplate = {
				state: 'failed',
				message: 'Error fetching template: ' + err
			};
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
				{#each Object.entries(detailsTemplate.data.template) as [key, value]}
					<BioCreateSection
						{key}
						title={value.title}
						type={value.meta.type}
						userDetails={detailsTemplate.data.userDetails}
						components={value.subComponents}
						bind:selectedData
					/>
				{/each}
			</div>
		{:else if detailsTemplate.state === 'pending'}
			<p>Loading data</p>
		{:else}
			<p>Something went wrong: {detailsTemplate.message}</p>
		{/if}
	</div>
	<div class="w-full max-md:hidden">//</div>
</div>
