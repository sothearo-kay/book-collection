import { redirect, fail } from '@sveltejs/kit';
import { getUserByEmail, createUser } from '$lib/server/user';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/session';
import { verifyPassword } from '$lib/server/crypto.js';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = (event) => {
	if (event.locals.session && event.locals.user) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions = {
	signin: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		const email = data.email?.toString() ?? '';
		const password = data.password?.toString() ?? '';

		// Retrieve user by email
		const user = await getUserByEmail(email);
		if (!user || !user.passwordHash) {
			return fail(401, { error: 'Invalid credentials' });
		}

		// Verify password
		const isValid = await verifyPassword(password, user.passwordHash);
		if (!isValid) {
			return fail(401, { error: 'Invalid credentials' });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(event, token, session.expiresAt);
		throw redirect(303, '/');
	},

	register: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		const email = data.email?.toString() ?? '';
		const username = data.username?.toString() ?? '';
		const password = data.password?.toString() ?? '';

		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return fail(400, { error: 'User already exists' });
		}

		const newUser = await createUser({ email, username, password });
		const token = generateSessionToken();
		const session = await createSession(token, newUser.id);
		setSessionTokenCookie(event, token, session.expiresAt);
		throw redirect(303, '/');
	}
} satisfies Actions;
