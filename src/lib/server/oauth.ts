import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

const CALLBACK_URL = 'http://localhost:5173/login/github/callback';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL);
