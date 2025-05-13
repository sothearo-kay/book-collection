<script lang="ts">
	import { Loader } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		use?: HTMLButtonElement;
		variant?: 'default' | 'outline' | 'ghost' | 'link';
		position?: 'start' | 'center' | 'end';
		rounded?: 'md' | 'lg';
		fluid?: boolean;
		loading?: boolean;
		children: Snippet;
	}

	let {
		use = $bindable(),
		variant = 'default',
		position = 'center',
		rounded = 'lg',
		fluid,
		loading,
		children,
		class: buttonClass = '',
		...buttonProps
	}: Props = $props();

	const variants = {
		default: `
		border border-transparent 
		bg-black text-white 
		hover:bg-neutral-800 
		dark:bg-white dark:text-black 
		dark:hover:bg-neutral-200
	`,
		outline: `
		border text-text dark:text-text-dark 
		hover:bg-neutral-100 
		dark:hover:bg-[#232323]
	`,
		ghost: `
		border border-transparent text-neutral-600 
		hover:bg-neutral-100 
		dark:text-neutral-300 
		dark:hover:bg-[#232323]
	`,
		link: `
		text-base! p-0! 
		text-blue-600 dark:text-blue-400 
		underline-offset-3 hover:underline
	`
	};

	const justifyVariants = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end'
	};

	const roundedVariants = {
		md: 'rounded-md',
		lg: 'rounded-lg'
	};
</script>

<button
	bind:this={use}
	{...buttonProps}
	class={[
		'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium',
		'transition-colors disabled:cursor-not-allowed',
		variants[variant],
		justifyVariants[position],
		roundedVariants[rounded],
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
