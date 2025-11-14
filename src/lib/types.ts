import type { Icon } from 'lucide-svelte';

export type NavMenuItem = {
	icon: typeof Icon;
	title: string;
	href: string;
};
