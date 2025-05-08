<script lang="ts">
	import { Mail, SquareUser, BadgeX } from '@lucide/svelte';
	import InputField from '../../components/ui/inputField.svelte';
	import Password from '../../components/ui/password.svelte';
	import Button from '../../components/ui/button.svelte';
	import Divider from '../../components/ui/divider.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let mode = $state<'login' | 'register'>('login');
</script>

{#snippet loginForm()}
	<form method="POST" action="?/signin" class="space-y-4">
		<InputField label="Email Address" Icon={Mail} id="email" name="email" type="email" required />
		<Password label="Password" id="password" name="password" required />
		<Button fluid type="submit">Sign in</Button>
	</form>
{/snippet}

{#snippet registerForm()}
	<form method="POST" action="?/register" class="space-y-4">
		<InputField label="Username" Icon={SquareUser} id="username" name="username" required />
		<InputField label="Email Address" Icon={Mail} id="email" name="email" type="email" required />
		<Password label="Password" id="password" name="password" required />
		<Button fluid type="submit">Create Account</Button>
	</form>
{/snippet}

<main class="grid h-screen gap-4 p-4 max-md:h-auto md:grid-cols-2">
	<div class="flex items-center justify-center rounded-2xl lg:border lg:shadow-xs">
		<div class="relative flex-1 rounded-xl border p-6 shadow-xs md:max-w-md">
			{#if form?.error}
				<div
					class={[
						'absolute inset-x-0 -top-6 -translate-y-full border-red-300 bg-red-100 text-red-800',
						'flex items-center gap-x-3 rounded-lg border px-4 py-2 '
					]}
				>
					<BadgeX class="h-5 w-5" />
					<p>{form.error}</p>
				</div>
			{/if}

			<div class="my-6 text-center">
				<h1 class="font-semibold">{mode === 'login' ? 'Sign in' : 'Sign up'} to Account</h1>
				<p class="mt-1 text-sm text-neutral-500">
					{mode === 'login'
						? 'Welcome back! Please enter your credentials to continue.'
						: 'Create an account to get started.'}
				</p>
			</div>

			{#if mode === 'login'}
				{@render loginForm()}
			{:else}
				{@render registerForm()}
			{/if}

			<Divider text="Or" position="center" />

			<a href="/login/github">
				<Button variant="outline" fluid class="gap-2">
					<img src="/github.svg" alt="Github's logo" class="h-5 w-5" />
					Sign in with GitHub
				</Button>
			</a>

			<div class="mt-4 flex justify-center gap-1">
				<p>{mode === 'login' ? 'Need an Account?' : 'Have an account?'}</p>
				<Button variant="link" onclick={() => (mode = mode === 'login' ? 'register' : 'login')}>
					{mode === 'login' ? 'Register' : 'Log in'}
				</Button>
			</div>
		</div>
	</div>

	<div class="max-md:row-start-1">
		<img
			src="https://images.unsplash.com/photo-1699511142520-af2451ba3414?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt="login background"
			class="h-full rounded-xl border object-cover object-center shadow-sm max-md:aspect-video"
		/>
	</div>
</main>
