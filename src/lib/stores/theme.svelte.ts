import { Moon, Sun, Monitor, Component } from '@lucide/svelte';

export type Theme = 'light' | 'dark' | 'system';
export type ActualTheme = 'light' | 'dark';

export const theme = $state<{ value: Theme }>({ value: 'system' });
export const actualTheme = $state<{ value: ActualTheme }>({ value: 'light' });

export const themeOptions: { value: Theme; Icon: typeof Component }[] = [
	{ value: 'light', Icon: Sun },
	{ value: 'dark', Icon: Moon },
	{ value: 'system', Icon: Monitor }
];
