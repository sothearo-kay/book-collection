import { github } from '$lib/server/oauth';
import { createUser, getUserFromGithubId } from '$lib/server/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import type { RequestEvent } from './$types';
import type { OAuth2Tokens } from 'arctic';

interface GitHubEmail {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: 'public' | 'private' | null;
}

export async function GET(event: RequestEvent): Promise<Response> {
	const url = new URL(event.request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state');

	if (!code || !state || state !== storedState) {
		return new Response('Invalid state', { status: 400 });
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch {
		return new Response('Please restart the process.', {
			status: 400
		});
	}

	const githubAccessToken = tokens.accessToken();
	const userResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${githubAccessToken}`
		}
	});
	const { id: githubId, login: username } = await userResponse.json();

	let user = await getUserFromGithubId(githubId);
	if (!user) {
		const emailResponse = await fetch('https://api.github.com/user/emails', {
			headers: { Authorization: `Bearer ${githubAccessToken}` }
		});
		const emails: GitHubEmail[] = await emailResponse.json();
		const primaryEmail = emails.find((e) => e.primary && e.verified)?.email;
		if (!primaryEmail) {
			return new Response('No verified primary email found.', { status: 400 });
		}
		user = await createUser({ githubId, username, email: primaryEmail });
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
