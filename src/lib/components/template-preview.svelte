<script lang="ts">
	const {
		id,
		title,
		thumbnail,
		onClick
	}: { id: string; title: string; thumbnail: string; onClick: Function } = $props();
</script>

<div
	role="button"
	tabindex="0"
	onkeydown={(e) => {}}
	onclick={() => {
		onClick(id);
	}}
	class="flex cursor-pointer flex-col gap-y-xs"
>
	<div class="aspect-[calc(1/sqrt(2))] h-60 border border-darkerBg shadow-md/10">
		<img
			alt="thumbnail"
			src="https://marketplace.canva.com/EAGB2-hwc2A/1/0/1131w/canva-minimalist-white-and-grey-professional-resume-7wI4I6L9Vfc.jpg"
		/>
	</div>
	<p class="font-semibold">{title}</p>
</div>
