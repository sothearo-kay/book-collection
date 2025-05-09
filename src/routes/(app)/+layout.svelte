<script lang="ts">
	import { enhance } from '$app/forms';
	import Popover from '../../components/ui/popover.svelte';
	import Avatar from '../../components/ui/avatar.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const avatarUrl = data.user.githubId
		? `https://avatars.githubusercontent.com/u/${data.user.githubId}`
		: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(data.user.username)}`;
</script>

<header class="sticky top-0 border-b bg-white">
	<div class="container flex items-center py-2">
		<div class="flex-1"></div>
		<Popover contentClass="origin-top-right">
			{#snippet trigger()}
				<Avatar size={42} src={avatarUrl} alt="User's Profile" />
			{/snippet}

			{#snippet content()}
				<h1>kon papa</h1>
			{/snippet}
		</Popover>
	</div>
</header>

<form method="post" action="/dashboard" use:enhance>
	<button>Sign out</button>
</form>

{@render children()}
