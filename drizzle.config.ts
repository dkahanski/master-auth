import { defineConfig } from 'drizzle-kit';
import env from './lib/env';

export default defineConfig({
	out: './app/lib/db/migrations',
	schema: './app/lib/db/schemas/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
