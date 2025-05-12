<script lang="ts">
	interface Props {
		text: string;
		position: 'start' | 'center' | 'end';
		size: 'md' | 'lg';
		class: string;
	}

	const { text, position = 'center', size = 'lg', class: userClass }: Partial<Props> = $props();

	const hrFlexByTextPosition = {
		start: ['flex-none', 'flex-grow'],
		center: ['flex-1', 'flex-1'],
		end: ['flex-grow', 'flex-none']
	} as const;

	const [startHrFlex, endHrFlex] = hrFlexByTextPosition[position];

	const textMarginMap = {
		start: 'mr-4',
		center: 'mx-4',
		end: 'ml-4'
	} as const;

	const textMargin = textMarginMap[position];

	const sizeMap = {
		md: 'my-3',
		lg: 'my-6'
	};

	const marginY = sizeMap[size];
</script>

<div class={`flex items-center ${marginY} ${userClass}`}>
	<hr class={`${startHrFlex} border-t`} />

	{#if text}
		<span class={`text-sm whitespace-nowrap text-gray-500 ${textMargin}`}>{text}</span>
	{/if}

	<hr class={`${endHrFlex} border-t`} />
</div>
