import { db } from './db';
import { user as userTable, type User } from './db/schema';
import { hashPassword } from './crypto';
import { eq, type AnyColumn } from 'drizzle-orm';

async function getUserByField<T>(field: AnyColumn, value: T): Promise<User | null> {
	const [user] = await db.select().from(userTable).where(eq(field, value));
	return user ?? null;
}

// prettier-ignore
export const getUserFromGithubId = (githubId: number) => getUserByField(userTable.githubId, githubId);
export const getUserByEmail = (email: string) => getUserByField(userTable.email, email);

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
