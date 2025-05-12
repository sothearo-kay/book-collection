<script lang="ts">
	import '../app.css';
	import { applyTheme } from '$lib/utils/theme';
	import type { Theme } from '$lib/stores/theme.svelte';

	let { children } = $props();

	$effect(() => {
		if (typeof window === 'undefined') return;

		const stored = localStorage.getItem('theme') as Theme | null;
		const mode = stored === 'light' || stored === 'dark' ? stored : 'system';

		applyTheme(mode);
	});
</script>

<main class={['min-h-screen', 'dark:bg-bg-dark bg-bg text-text dark:text-text-dark']}>
	{@render children()}
</main>
