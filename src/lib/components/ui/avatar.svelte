<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends HTMLImgAttributes {
		size?: number;
	}

	const { size = 64, class: className = '', ...imgProps }: Props = $props();
</script>

<div
	class={`overflow-hidden rounded-full border ${className}`}
	style={`width: ${size}px; height: ${size}px;`}
>
	<img {...imgProps} width={size} height={size} />
</div>
