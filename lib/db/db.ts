import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/lib/db/schemas';
import env from '@/lib/env';

export const db = drizzle(env.DATABASE_URL, { schema, casing: 'snake_case' });
