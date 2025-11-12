import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/app/lib/db/schemas';
import env from '@/app/lib/env';

export const db = drizzle(env.DATABASE_URL, { schema, casing: 'snake_case' });
