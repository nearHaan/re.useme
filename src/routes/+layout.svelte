<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BookUserIcon, FileIcon, LayoutDashboardIcon, MenuIcon } from 'lucide-svelte';
	import SidebarBtn from '$lib/components/sidebar-btn.svelte';
	import type { NavMenuItem } from '$lib/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();
	let meunOpen = $state(false);

	const menuItems: NavMenuItem[] = [
		{
			icon: LayoutDashboardIcon,
			title: 'Resumes',
			href: '/'
		},
		{
			icon: BookUserIcon,
			title: 'Biodata',
			href: '/bio'
		},
		{
			icon: FileIcon,
			title: 'Documents',
			href: '/doc'
		}
	];

	function toggleMenu() {
		meunOpen = !meunOpen;
	}

	function closeMenu() {
		meunOpen = false;
	}

	function onTabClick(title: string, href: string) {
		console.log('hi');
		goto(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen w-screen flex-col">
	{#if meunOpen}
		<div
			class="absolute inset-0 z-40 flex justify-end bg-transparent-black"
			tabindex="0"
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					closeMenu();
				}
			}}
			role="button"
			onclick={() => {
				closeMenu();
			}}
		>
			<div class="z-30 h-full w-60 bg-gray-100 p-sm">
				{#each menuItems as item}
					<SidebarBtn
						Icon={item.icon}
						title={item.title}
						href={item.href}
						onClick={onTabClick}
						isActive={page.url.pathname === item.href}
						isFullWidth={true}
					/>
				{/each}
			</div>
		</div>
	{/if}
	<header class="z-10 flex h-16 w-full items-center justify-between bg-primary px-5">
		<h2 class="text-white">re.useme</h2>
		<button class="md:hidden" onclick={toggleMenu}>
			<MenuIcon color="white" />
		</button>
	</header>
	<div class="flex h-full w-screen">
		{#if page.url.pathname !== '/login'}
			<div
				class="{page.url.pathname !== '/bio'
					? 'w-60'
					: 'w-fit'} z-20 bg-gray-100 p-sm max-md:hidden"
			>
				{#each menuItems as item}
					<SidebarBtn
						Icon={item.icon}
						title={item.title}
						href={item.href}
						onClick={onTabClick}
						isActive={page.url.pathname === item.href}
						isFullWidth={page.url.pathname !== '/bio'}
					/>
				{/each}
			</div>
		{/if}
		<div class="w-full">
			{@render children()}
		</div>
	</div>
</div>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeMenu()} />
