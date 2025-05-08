<script lang="ts">
	interface Props {
		text: string;
		position: 'start' | 'center' | 'end';
		class: string;
	}

	const { text, position = 'center', class: userClass }: Partial<Props> = $props();

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
</script>

<div class={`my-6 flex items-center ${userClass}`}>
	<hr class={`${startHrFlex} border-t`} />

	{#if text}
		<span class={`text-sm whitespace-nowrap text-gray-500 ${textMargin}`}>{text}</span>
	{/if}

	<hr class={`${endHrFlex} border-t`} />
</div>
