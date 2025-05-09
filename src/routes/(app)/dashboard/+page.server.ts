import { fail, redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}

		invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	}
} satisfies Actions;
