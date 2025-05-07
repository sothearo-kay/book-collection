import { sql } from 'drizzle-orm';
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	githubId: integer('github_id')
		.default(sql`NULL`)
		.unique(),
	username: text('username').notNull(),
	email: text('email').notNull(),
	passwordHash: text('password_hash')
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
