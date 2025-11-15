<script lang="ts">
	const {
		title,
		onClick,
		isActive
	}: {
		title: string;
		onClick: Function;
		isActive: boolean;
	} = $props();
</script>

<button
	onclick={() => {
		onClick(title);
	}}
	class="w-full rounded bg-background p-sm text-left"
>
	<p class="font-semibold">{title}</p>
</button>
