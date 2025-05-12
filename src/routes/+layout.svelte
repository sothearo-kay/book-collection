<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class={['min-h-screen', 'dark:bg-bg-dark bg-bg text-text dark:text-text-dark']}>
	{@render children()}
</main>
