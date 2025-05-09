<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { scale, fade } from 'svelte/transition';

	interface Props {
		open?: boolean;
		trigger: Snippet;
		content: Snippet;
		contentClass?: string;
	}

	let { open = $bindable(false), trigger, content, contentClass }: Props = $props();
	let triggerEl: HTMLButtonElement;
	let popoverEl: HTMLDivElement;

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const toggle = () => {
		open = !open;
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			open &&
			!triggerEl.contains(event.target as Node) &&
			!popoverEl.contains(event.target as Node)
		) {
			open = false;
		}
	};
</script>

<div class="relative inline-flex">
	<button bind:this={triggerEl} onclick={toggle}>
		{@render trigger?.()}
	</button>

	{#if open}
		<div
			bind:this={popoverEl}
			in:scale={{ duration: 300 }}
			out:fade={{ duration: 150 }}
			class={[
				'absolute right-0 -bottom-2 w-full translate-y-full rounded-lg border bg-white shadow-sm',
				contentClass
			]}
		>
			{@render content?.()}
		</div>
	{/if}
</div>
