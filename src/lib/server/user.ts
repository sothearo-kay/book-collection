import { db } from './db';
import { user as userTable, type User } from './db/schema';
import { eq } from 'drizzle-orm';

export async function getUserFromGithubId(githubId: number): Promise<User> {
	const [existingUser] = await db.select().from(userTable).where(eq(userTable.githubId, githubId));
	return existingUser ?? null;
}

export async function createUser(githubId: number, username: string, email: string): Promise<User> {
	const [newUser] = await db
		.insert(userTable)
		.values({ id: crypto.randomUUID(), githubId, username, email })
		.returning();
	return newUser;
}
