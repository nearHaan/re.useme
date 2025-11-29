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

export type DetailsTemplateItem = {
	title: string;
	meta: {
		desc: string;
		type: 'single' | 'list';
	};
	subComponents: { [key: string]: { title: string; type: string; example: string } };
};

export type DetailsTemplateType = { [key: string]: DetailsTemplateItem };

export type TemplateThumbnailType = {
	id: string;
	title: string;
	thumbnail: string; //img url
	template: object;
};

export type BioDataType = {
	template: DetailsTemplateType;
	userDetails: Record<string, any>;
};

export type ResumeDataType = {
	template: DetailsTemplateType;
	userDetails: Record<string, any>;
};
