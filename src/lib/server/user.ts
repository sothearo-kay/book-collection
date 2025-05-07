import { db } from './db';
import { user as userTable, type User } from './db/schema';
import { hashPassword } from './crypto';
import { eq } from 'drizzle-orm';

export async function getUserFromGithubId(githubId: number): Promise<User | null> {
	const [existingUser] = await db.select().from(userTable).where(eq(userTable.githubId, githubId));
	return existingUser ?? null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const [existingUser] = await db.select().from(userTable).where(eq(userTable.email, email));
	return existingUser ?? null;
}

export async function createUser({
	githubId,
	username,
	email,
	password
}: {
	githubId?: number;
	username: string;
	email: string;
	password?: string;
}): Promise<User> {
	const passwordHash = password ? await hashPassword(password) : null;
	const [newUser] = await db
		.insert(userTable)
		.values({ id: crypto.randomUUID(), githubId, username, email, passwordHash })
		.returning();

	return newUser;
}
