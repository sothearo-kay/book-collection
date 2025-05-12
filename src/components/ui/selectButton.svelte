<script lang="ts" generics="T">
	import Button from './button.svelte';
	import type { Component } from '@lucide/svelte';
	import { styleToString } from '$lib';

	type Option = {
		value: T;
		label?: string;
		class?: string;
		Icon: typeof Component;
	};

	interface Props {
		value: T;
		options: Option[];
		class: string;
	}

	let { value = $bindable(), options, class: className = '' }: Props = $props();
	let mounted = $state(false);
	let containerEl: HTMLDivElement;
	let optionEls = $state<HTMLButtonElement[]>([]);
	let bgStyle = $state({ transform: 'translateX(0px)', width: '0px' });
	let activeIndex = $derived(options.findIndex((o) => o.value === value));

	$effect(() => {
		const el = optionEls[activeIndex];
		if (el && containerEl) {
			const { offsetLeft, offsetWidth } = el;
			bgStyle = {
				transform: `translateX(${offsetLeft}px)`,
				width: `${offsetWidth}px`
			};

			// Wait 1 frame before allowing transition (to avoid it running on first paint)
			requestAnimationFrame(() => {
				mounted = true;
			});
		}
	});

	const setOptionValue = (v: T) => {
		value = v;
	};
</script>

<div bind:this={containerEl} class={`relative flex rounded-lg bg-neutral-100 ${className}`}>
	<div
		class={[
			'absolute inset-y-0 z-0 mb-px rounded-md border bg-white shadow-sm',
			mounted && 'transition-transform duration-300'
		]}
		style={styleToString(bgStyle)}
	></div>

	{#each options as option, i (option.value)}
		<Button
			bind:use={optionEls[i]}
			variant="ghost"
			onclick={() => setOptionValue(option.value)}
			class={['relative z-10 flex-1 hover:bg-transparent', option.class]}
		>
			<option.Icon class="h-5 w-5" />
		</Button>
	{/each}
</div>
