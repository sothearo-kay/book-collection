<script lang="ts">
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let mode = $state<'login' | 'register'>('login');
</script>

{#snippet loginForm()}
	<form method="POST" action="?/signin">
		<input name="email" type="email" placeholder="Email" required />
		<input name="password" type="password" placeholder="Password" required />
		<button type="submit">Log in</button>
	</form>
{/snippet}

{#snippet registerForm()}
	<form method="POST" action="?/register">
		<input name="username" placeholder="Username" required />
		<input name="email" type="email" placeholder="Email" required />
		<input name="password" type="password" placeholder="Password" required />
		<button type="submit">Sign up</button>
	</form>
{/snippet}

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<h1>{mode === 'login' ? 'Sign in' : 'Register'}</h1>

{#if mode === 'login'}
	{@render loginForm()}
{:else}
	{@render registerForm()}
{/if}

<button onclick={() => (mode = mode === 'login' ? 'register' : 'login')}>
	{mode === 'login' ? 'Need an account? Register' : 'Have an account? Log in'}
</button>

<a href="/login/github">Sign in with GitHub</a>
