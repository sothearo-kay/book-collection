import { redirect, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/session.js';

export const handle: Handle = async ({ event, resolve }) => {
	// Suppress requests to /.well-known/appspecific/com.chrome.devtools.json
	// https://github.com/sveltejs/kit/issues/13743
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools.json')) {
		return new Response(null, { status: 204 }); // No Content
	}

	// Route Rules '/' -> '/dashboard'
	if (event.url.pathname === '/') {
		throw redirect(307, '/dashboard');
	}

	// Authentication logic
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
