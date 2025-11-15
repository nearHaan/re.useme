import type { Icon } from 'lucide-svelte';

export type NavMenuItem = {
	icon: typeof Icon;
	title: string;
	href: string;
};

export type TemplateSubComponent = {
	title: string;
	type: 'photo' | 'text' | 'number' | 'email' | 'url' | 'text-area' | 'date' | 'skill';
	example: string;
};
