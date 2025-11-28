<script lang="ts">
	import { getBioData, updateUserData } from '$lib/api/dataform';
	import BioCompCard from '$lib/components/bio-comp-card.svelte';
	import BioSectionBtn from '$lib/components/bio-section-btn.svelte';
	import LoadingCircle from '$lib/components/loading-circle.svelte';
	import type { BioDataType, LoadedData } from '$lib/types';
	import { ChevronDown, Trash } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let detailsTemplate: LoadedData<BioDataType> = $state({
		state: 'pending',
		message: 'Loading template'
	});
	let activeSectionKey = $state<string>('');
	let keys: Array<string> = $state([]);
	let activeIndex = $state(0);
	let isLoading = $state(false);
	let changeChangeSecKeys = $state(new Set<string>()); // To track sections whose details have changed

	onMount(async () => {
		try {
			detailsTemplate = {
				state: 'success',
				data: await getBioData()
			};
			keys = Object.keys(detailsTemplate.data.template);
			activeSectionKey = keys[activeIndex];
			changeChangeSecKeys = new Set();
		} catch (err: any) {
			console.error(err);
			detailsTemplate = {
				state: 'failed',
				message: 'Error fetching template'
			};
		}
	});

	$effect(() => {
		if (detailsTemplate.state === 'success') {
			activeSectionKey = Object.keys(detailsTemplate.data.template)[0];
		}
	});

	let showSections = $state(false);

	function onSectionClick(key: string) {
		activeSectionKey = key;
		activeIndex = keys.indexOf(activeSectionKey);
	}

	function onDeleteClick(index: number) {
		if (detailsTemplate.state === 'success') {
			changeChangeSecKeys.add(activeSectionKey);
			changeChangeSecKeys = new Set(changeChangeSecKeys);
			(detailsTemplate.data.userDetails[activeSectionKey] as Array<Record<string, string>>).splice(
				index,
				1
			);
		}
	}

	function onAddElem(parentId: string) {
		if (detailsTemplate.state === 'success') {
			const sample = Object.keys(detailsTemplate.data.template[parentId].subComponents);
			console.log(sample);
			if (
				detailsTemplate.data.userDetails[parentId] === undefined ||
				detailsTemplate.data.userDetails[parentId] === null
			) {
				detailsTemplate.data.userDetails[parentId] = new Array<Record<string, string>>();
			}
			(detailsTemplate.data.userDetails[parentId] as Array<Record<string, string>>).push(
				sample.reduce((acc: Record<string, string>, key: string) => {
					acc[key] = '';
					return acc;
				}, {})
			);
			changeChangeSecKeys.add(activeSectionKey);
			changeChangeSecKeys = new Set(changeChangeSecKeys);
		}
	}

	function onPrevious() {
		activeIndex = activeIndex > 0 ? activeIndex - 1 : activeIndex;
		activeSectionKey = keys[activeIndex];
	}

	// TODO: Prevent unnecessary api call if data not changed
	async function onSave() {
		if (detailsTemplate.state === 'success') {
			if (changeChangeSecKeys.has(activeSectionKey)) {
				isLoading = true;
				try {
					const success = await updateUserData(
						activeSectionKey,
						detailsTemplate.data.userDetails[activeSectionKey]
					);
					if (success) {
						changeChangeSecKeys.delete(activeSectionKey);
						console.log('Updated');
					}
				} catch (err: any) {
					console.log('Error: ', err);
				} finally {
					isLoading = false;
				}
			}
			activeIndex = activeIndex + 1 < keys.length ? activeIndex + 1 : activeIndex;
			activeSectionKey = keys[activeIndex];
			console.log($state.snapshot(detailsTemplate.data.userDetails));
		}
	}
</script>

<div class="flex h-full bg-darkerBg">
	<div class="flex h-full w-100 flex-col gap-sm p-sm max-md:hidden">
		{#if detailsTemplate.state === 'success'}
			{#each Object.entries(detailsTemplate.data.template) as [key, value]}
				<BioSectionBtn
					title={value.title}
					onClick={() => {
						onSectionClick(key);
					}}
					isActive={false}
				/>
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
						<BioSectionBtn
							title={value.title}
							onClick={() => {
								onSectionClick(key);
							}}
							isActive={false}
						/>
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
						parentId={activeSectionKey}
						index={0}
						subComponents={detailsTemplate.data.template[activeSectionKey].subComponents}
						bind:bindVariable={detailsTemplate.data.userDetails}
						bind:changeChangeSecKeys
						fallbackFunc={onAddElem}
					/>
				</div>
				<!-- list type -->
			{:else}
				<div class="flex w-full flex-col items-start gap-y-sm overflow-auto">
					{#each detailsTemplate.data.userDetails[activeSectionKey] as item, i}
						<div class="flex w-full max-md:flex-col">
							<BioCompCard
								parentId={activeSectionKey}
								index={i}
								subComponents={detailsTemplate.data.template[activeSectionKey].subComponents}
								bind:bindVariable={detailsTemplate.data.userDetails}
								bind:changeChangeSecKeys
								fallbackFunc={onAddElem}
							/>
							<div
								class="flex h-full items-start justify-center bg-darkerBg p-xs max-md:w-full max-md:justify-end"
							>
								<button
									onclick={() => {
										onDeleteClick(i);
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
							onAddElem(activeSectionKey);
						}}
						class="w-fit py-xs font-semibold text-secondary"
						>Add {detailsTemplate.data.template[activeSectionKey].title}</button
					>
				</div>
			{/if}
			<div class="mt-sm flex items-center justify-between">
				<button onclick={onPrevious} class="btn-outlined"> Previous </button>
				<button onclick={onSave} class="btn-primary">
					{#if isLoading}
						<p><LoadingCircle /></p>
					{:else}<p class="text-background">
							{changeChangeSecKeys.has(activeSectionKey) ? 'Save &' : ''} Next
						</p>
					{/if}
				</button>
			</div>
		</div>
	{:else if detailsTemplate.state === 'pending'}
		<p>Loading Template</p>
	{:else}
		<p>Something went wrong</p>
	{/if}
</div>
