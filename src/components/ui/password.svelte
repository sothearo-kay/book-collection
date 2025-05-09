<script lang="ts">
	import { Eye, EyeOff, LockKeyhole } from '@lucide/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
	}

	let { label, id, ...inputProps }: Props = $props();
	let isVisible = $state<boolean>(false);
	let inputType = $derived(isVisible ? 'text' : 'password');
</script>

<div class="flex flex-col">
	{#if label}
		<label for={id} class="ms-2 mb-2 text-sm font-medium">{label}</label>
	{/if}
	<div class="relative">
		<LockKeyhole class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
		<input
			{id}
			{...inputProps}
			type={inputType}
			class="w-full rounded-lg border py-1.5 pr-4 pl-10"
		/>
		<button
			type="button"
			class="absolute top-1/2 right-3 -translate-y-1/2"
			onclick={() => (isVisible = !isVisible)}
		>
			{#if isVisible}
				<EyeOff class="h-5 w-5" />
			{:else}
				<Eye class="h-5 w-5" />
			{/if}
		</button>
	</div>
</div>
