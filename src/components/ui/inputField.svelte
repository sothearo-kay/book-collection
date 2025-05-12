<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Component } from '@lucide/svelte';

	interface Props extends HTMLInputAttributes {
		label?: string;
		Icon: typeof Component;
	}

	let { label, Icon, id, ...inputProps }: Props = $props();
</script>

<div class="flex flex-col">
	{#if label}
		<label for={id} class="ms-2 mb-2 text-sm font-medium">{label}</label>
	{/if}
	<div class="relative">
		<input {id} {...inputProps} class="peer w-full rounded-lg border py-2 pr-4 pl-10 text-sm" />
		{#if Icon}
			<Icon
				class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 dark:peer-autofill:text-black"
			/>
		{/if}
	</div>
</div>
