<script lang="ts">
	const { Icon, title, href, onClick, isActive, isFullWidth } = $props();
</script>

<button
	type="button"
	onclick={() => {
		onClick(title, href);
	}}
	{title}
	class="btn-sidebar {isFullWidth ? 'w-full' : 'w-fit'} {isActive ? 'btn-sidebar-active' : ''}"
>
	<Icon fill="currentColor"></Icon>
	<p class={isFullWidth ? '' : 'hidden'}>{title}</p>
</button>
