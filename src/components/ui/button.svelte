<script lang="ts">
	import { Loader } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'default' | 'outline' | 'link';
		fluid?: boolean;
		loading?: boolean;
		children: Snippet;
	}

	const {
		variant = 'default',
		fluid,
		loading,
		children,
		class: buttonClass,
		...buttonProps
	}: Props = $props();

	const variants = {
		default: 'border border-transparent bg-black text-white hover:bg-neutral-800',
		outline: 'border text-black hover:bg-neutral-100',
		link: 'text-base! p-0! text-blue-600 underline-offset-3 hover:underline'
	};
</script>

<button
	{...buttonProps}
	class={[
		'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium',
		'transition-colors disabled:cursor-not-allowed',
		variants[variant],
		buttonClass,
		fluid && 'w-full'
	]}
>
	{#if loading}
		<Loader class="animate-slow-spin h-5 w-5" />
	{:else}
		{@render children()}
	{/if}
</button>
