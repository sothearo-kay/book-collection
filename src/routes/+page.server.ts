import { fail, redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';
import type { PageServerLoad, Actions } from './$types';
import type { User } from '$lib/server/db/schema';

export const load: PageServerLoad = (event) => {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, '/login');
	}

	return {
		user: event.locals.user as User
	};
};

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
