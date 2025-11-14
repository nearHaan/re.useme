<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BookUserIcon, FileIcon, LayoutDashboardIcon } from 'lucide-svelte';
	import SidebarBtn from '$lib/components/sidebar-btn.svelte';
	import type { NavMenuItem } from '$lib/types';
	import { goto } from '$app/navigation';

	let { children } = $props();
	let activeTab = $state('Resumes');

	const menuItems: NavMenuItem[] = [
		{
			icon: LayoutDashboardIcon,
			title: 'Resumes',
			href: '/'
		},
		{
			icon: BookUserIcon,
			title: 'Biodata',
			href: '/'
		},
		{
			icon: FileIcon,
			title: 'Documents',
			href: '/'
		}
	];

	function onTabClick(title: string, href: string) {
		activeTab = title;
		goto(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen w-screen flex-col">
	<header class="flex h-15 w-full items-center justify-between bg-primary px-5">
		<h2 class="text-white">re.useme</h2>
	</header>
	<div class="flex h-full">
		<div class="w-60 p-sm">
			{#each menuItems as item}
				<SidebarBtn
					Icon={item.icon}
					title={item.title}
					href={item.href}
					onClick={onTabClick}
					isActive={activeTab === item.title}
				/>
			{/each}
		</div>
		<div>
			{@render children()}
		</div>
	</div>
</div>
