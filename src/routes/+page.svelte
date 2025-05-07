<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const avatarUrl = data.user.githubId
		? `https://avatars.githubusercontent.com/u/${data.user.githubId}`
		: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(data.user.username)}`;
</script>

<h1>Hi, {data.user.username}!</h1>
<img src={avatarUrl} height="100px" width="100px" alt="profile" />
<p>Email: {data.user.email}</p>

<form method="post" use:enhance>
	<button>Sign out</button>
</form>
