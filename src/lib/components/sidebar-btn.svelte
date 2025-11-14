<script lang="ts">
	const { Icon, title, href, onClick, isActive } = $props();
</script>

<button
	type="button"
	onclick={() => {
		onClick(title, href);
	}}
	class="btn-sidebar {isActive ? 'btn-sidebar-active' : ''}"
>
	<Icon fill="currentColor"></Icon>
	<p>{title}</p>
</button>
