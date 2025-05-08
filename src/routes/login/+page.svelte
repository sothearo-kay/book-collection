<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Mail, SquareUser, BadgeX } from '@lucide/svelte';
	import InputField from '../../components/ui/inputField.svelte';
	import Password from '../../components/ui/password.svelte';
	import Button from '../../components/ui/button.svelte';
	import Divider from '../../components/ui/divider.svelte';
	import type { PageProps, SubmitFunction } from './$types';

	let { form }: PageProps = $props();
	let mode = $state<'login' | 'register'>('login');
	let loading = $state<boolean>(false);
	let navigating = $state<boolean>(false);

	const loadingEnhance: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};

	const heightTransition = (node: HTMLElement, { duration = 300 } = {}) => {
		const height = node.offsetHeight;
		return {
			duration,
			easing: cubicOut,
			css: (t: number) => `height: ${t * height}px; overflow: hidden;`
		};
	};
</script>

{#snippet loginForm()}
	<form method="POST" action="?/signin" use:enhance={loadingEnhance} class="space-y-4">
		<InputField label="Email Address" Icon={Mail} id="email" name="email" type="email" required />
		<Password label="Password" id="password" name="password" required />
		<Button disabled={loading} {loading} fluid type="submit">Sign in</Button>
	</form>
{/snippet}

{#snippet registerForm()}
	<form method="POST" action="?/register" use:enhance={loadingEnhance} class="space-y-4">
		<InputField label="Username" Icon={SquareUser} id="username" name="username" required />
		<InputField label="Email Address" Icon={Mail} id="email" name="email" type="email" required />
		<Password label="Password" id="password" name="password" required />
		<Button disabled={loading} {loading} fluid type="submit">Create Account</Button>
	</form>
{/snippet}

<main class="grid h-screen gap-4 p-4 max-md:h-auto md:grid-cols-2">
	<div class="flex flex-col items-center justify-center gap-y-4 rounded-2xl lg:border lg:shadow-xs">
		<div class="w-full space-y-4 md:max-w-md">
			<div class="rounded-xl border p-6 shadow-xs">
				<div class="my-6 text-center">
					<h1 class="font-semibold">{mode === 'login' ? 'Sign in' : 'Sign up'} to Account</h1>
					<p class="mt-1 text-sm text-neutral-500">
						{mode === 'login'
							? 'Welcome back! Please enter your credentials to continue.'
							: 'Create an account to get started.'}
					</p>
				</div>

				{#key mode}
					<div transition:heightTransition>
						{#if mode === 'login'}
							{@render loginForm()}
						{:else}
							{@render registerForm()}
						{/if}
					</div>
				{/key}

				<Divider text="Or" position="center" />

				<a href="/login/github" onclick={() => (navigating = true)}>
					<Button disabled={navigating} variant="outline" loading={navigating} fluid class="gap-2">
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

			{#if form?.error}
				<div
					in:fly={{ y: -10 }}
					class={[
						'flex items-center gap-x-3 rounded-lg border px-4 py-2',
						'border-red-300 bg-red-100 text-red-800'
					]}
				>
					<BadgeX class="h-5 w-5" />
					<p>{form.error}</p>
				</div>
			{/if}
		</div>
	</div>

	<div class="max-md:row-start-1">
		<img
			src="https://images.unsplash.com/photo-1699511142520-af2451ba3414?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt="login background"
			class="rounded-xl border object-cover object-center shadow-sm max-md:aspect-video md:h-full"
		/>
	</div>
</main>
