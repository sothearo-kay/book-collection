<script lang="ts">
	import { enhance } from '$app/forms';
	import { LogOut, Moon, Sun, Monitor, Component } from '@lucide/svelte';
	import Popover from '../../components/ui/popover.svelte';
	import Avatar from '../../components/ui/avatar.svelte';
	import Button from '../../components/ui/button.svelte';
	import Divider from '../../components/ui/divider.svelte';
	import SelectButton from '../../components/ui/selectButton.svelte';
	import type { LayoutProps } from './$types';

	type Theme = 'light' | 'dark' | 'system';

	let { data, children }: LayoutProps = $props();
	let currentTheme = $state<Theme>('system');

	const avatarUrl = data.user.githubId
		? `https://avatars.githubusercontent.com/u/${data.user.githubId}`
		: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(data.user.username)}`;

	const themeOptions: { value: Theme; Icon: typeof Component }[] = [
		{ value: 'light', Icon: Sun },
		{ value: 'dark', Icon: Moon },
		{ value: 'system', Icon: Monitor }
	];

	$effect(() => {
		if (typeof window === 'undefined') return;

		const stored = localStorage.getItem('theme') as Theme | null;
		const mode = stored === 'light' || stored === 'dark' ? stored : 'system';

		applyTheme(mode);
	});

	const applyTheme = (theme: Theme) => {
		let actual: 'light' | 'dark';

		if (theme === 'system') {
			// detect OS setting in real time
			actual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

			// clear persisted choice
			localStorage.removeItem('theme');
			document.cookie = `theme=; max-age=0; path=/; SameSite=Lax`;
		} else {
			actual = theme;
			// store the user’s explicit choice
			localStorage.setItem('theme', theme);
			const oneYear = 60 * 60 * 24 * 365;
			document.cookie = `theme=${theme}; max-age=${oneYear}; path=/; SameSite=Lax`;
		}

		document.documentElement.setAttribute('data-theme', actual);
		currentTheme = theme;
	};

	const handleThemeChange = (theme: Theme) => {
		applyTheme(theme);
	};
</script>

<header class="sticky top-0">
	<div class="container flex items-center py-2">
		<div class="flex-1"></div>
		<Popover contentClass="origin-top-right min-w-[280px]">
			{#snippet trigger()}
				<Avatar size={42} src={avatarUrl} alt="User's Profile" />
			{/snippet}

			{#snippet content()}
				<div class="px-4 py-2">
					<div class="mt-2 flex gap-x-2">
						<Avatar size={42} src={avatarUrl} alt="User's Profile" class="shrink-0" />
						<div>
							<p class="text-base font-bold">{data.user.username}</p>
							<p class="text-sm text-neutral-500">{data.user.email}</p>
						</div>
					</div>
					<Divider size="sm" />
					<SelectButton
						value={currentTheme}
						options={themeOptions}
						onChange={(theme) => handleThemeChange(theme)}
						class="mx-1"
					/>
					<Divider size="sm" />
					<form method="post" action="/dashboard" use:enhance>
						<Button variant="ghost" position="start" rounded="md" fluid>
							<LogOut class="h-5 w-5 rotate-180" />
							Log Out
						</Button>
					</form>
				</div>
			{/snippet}
		</Popover>
	</div>
</header>

{@render children()}
