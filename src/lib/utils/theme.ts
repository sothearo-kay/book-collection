import { theme, type Theme } from '$lib/stores/theme.svelte';

export const applyTheme = (selectedTheme: Theme) => {
	let actual: 'light' | 'dark';

	if (selectedTheme === 'system') {
		// detect OS setting in real time
		actual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

		// clear persisted choice
		localStorage.removeItem('theme');
		document.cookie = `theme=; max-age=0; path=/; SameSite=Lax`;
	} else {
		actual = selectedTheme;
		// store the user’s explicit choice
		localStorage.setItem('theme', selectedTheme);
		const oneYear = 60 * 60 * 24 * 365;
		document.cookie = `theme=${selectedTheme}; max-age=${oneYear}; path=/; SameSite=Lax`;
	}

	document.documentElement.setAttribute('data-theme', actual);
	theme.value = selectedTheme;
};
