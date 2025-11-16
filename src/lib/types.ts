import type { Icon } from 'lucide-svelte';

export type NavMenuItem = {
	icon: typeof Icon;
	title: string;
	href: string;
};

export type TemplateSubComponent = {
	title: string;
	type: 'photo' | 'text' | 'number' | 'email' | 'url' | 'text-area' | 'date' | 'skill' | string;
	example: string;
};

export type LoadedData<T> = LoadingSuccess<T> | LoadingPending | LoadingFailure;

type LoadingPending = {
	state: 'pending';
	message: string;
};

type LoadingSuccess<T> = {
	state: 'success';
	data: T;
};

type LoadingFailure = {
	state: 'failed';
	message: string;
};

type DetailsTemplateItem = {
	meta: {
		desc: string;
		type: 'single' | 'list';
	};
	subComponents: { [key: string]: { type: string; example: string } };
};

export type DetailsTemplateType = { [key: string]: DetailsTemplateItem };

export type TemplateThumbnailType = {
	title: string;
	thumbnail: string; //img url
	template: object;
};
