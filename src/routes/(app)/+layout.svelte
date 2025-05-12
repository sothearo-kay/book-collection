<script lang="ts">
	import { enhance } from '$app/forms';
	import { LogOut, Moon, Sun, Monitor, Component } from '@lucide/svelte';
	import Popover from '../../components/ui/popover.svelte';
	import Avatar from '../../components/ui/avatar.svelte';
	import Button from '../../components/ui/button.svelte';
	import Divider from '../../components/ui/divider.svelte';
	import SelectButton from '../../components/ui/selectButton.svelte';
	import { applyTheme } from '$lib/utils/theme';
	import { theme, type Theme } from '$lib/stores/theme.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const avatarUrl = data.user.githubId
		? `https://avatars.githubusercontent.com/u/${data.user.githubId}`
		: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(data.user.username)}`;

	const themeOptions: { value: Theme; Icon: typeof Component }[] = [
		{ value: 'light', Icon: Sun },
		{ value: 'dark', Icon: Moon },
		{ value: 'system', Icon: Monitor }
	];
</script>

<header class="sticky top-0">
	<div class="container flex items-center py-2">
		<div class="flex-1"></div>
		<Popover contentClass="origin-top-right min-w-[280px]">
			{#snippet trigger()}
				<Avatar size={42} src={avatarUrl} alt="User's Profile" />
			{/snippet}

			{#snippet content()}
				<div class="p-4">
					<div class="flex gap-x-2">
						<Avatar size={42} src={avatarUrl} alt="User's Profile" class="shrink-0" />
						<div>
							<p class="text-base font-bold">{data.user.username}</p>
							<p class="text-sm text-neutral-500">{data.user.email}</p>
						</div>
					</div>
					<Divider size="md" />
					<SelectButton
						value={theme.value}
						options={themeOptions}
						onChange={(theme) => applyTheme(theme)}
						class="mx-1"
					/>
					<Divider size="md" />
					<form method="post" action="/dashboard" use:enhance>
						<Button variant="ghost" position="start" rounded="md" fluid>
							<LogOut class="h-5 w-5" />
							Log out
						</Button>
					</form>
				</div>
			{/snippet}
		</Popover>
	</div>
</header>

{@render children()}
