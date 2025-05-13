import { type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/session.js';

export const handle: Handle = async ({ event, resolve }) => {
	// Suppress requests to /.well-known/appspecific/com.chrome.devtools.json
	// https://github.com/sveltejs/kit/issues/13743
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools.json')) {
		return new Response(null, { status: 204 }); // No Content
	}

	// Authentication logic
	const token = event.cookies.get(auth.sessionCookieName);

	if (!token) {
		event.locals.user = null;
		event.locals.session = null;
	} else {
		const { session, user } = await auth.validateSessionToken(token);
		if (session) {
			auth.setSessionTokenCookie(event, token, session.expiresAt);
		} else {
			auth.deleteSessionTokenCookie(event);
		}
		event.locals.user = user;
		event.locals.session = session;
	}

	// Handle theme (for SSR)
	const theme = event.cookies.get('theme');

	if (!theme) {
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=""', `data-theme="${theme}"`);
		}
	});
};
