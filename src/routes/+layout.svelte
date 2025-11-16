<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BookUserIcon, FileIcon, LayoutDashboardIcon, LogIn, MenuIcon } from 'lucide-svelte';
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
			<SidebarBtn
				Icon={LogIn}
				title="Login"
				href="/login"
				onClick={onTabClick}
				isActive={false}
				isFullWidth={true}
			/>
		</div>
	</div>
{/if}

<header
	class="absolute top-0 right-0 left-0 z-20 flex h-navbar-height w-full items-center justify-between bg-primary px-5"
>
	<a href="/"><h2 class="text-white">re.useme</h2></a>
	<div class="max-md:hidden">
		<a href="/login" class="nav-item">Login</a>
	</div>
	<button class="md:hidden" onclick={toggleMenu}>
		<MenuIcon color="white" />
	</button>
</header>
{#if page.url.pathname !== '/login'}
	<div class="absolute top-0 bottom-0 left-0 z-10 pt-navbar-height">
		<div
			class=" {page.url.pathname !== '/bio'
				? 'w-sidebar-width'
				: 'w-sidebar-shrink-width'} bg-darkBg p-xs max-md:hidden"
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
	</div>
{/if}
<div
	class="absolute inset-0 z-0 pt-navbar-height {page.url.pathname === '/login'
		? ''
		: page.url.pathname === '/bio'
			? 'md:pl-sidebar-shrink-width'
			: 'md:pl-sidebar-width'}"
>
	{@render children()}
</div>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeMenu()} />
