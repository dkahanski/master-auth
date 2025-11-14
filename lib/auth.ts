import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db/db';
import { nextCookies } from 'better-auth/next-js';
import env from '@/lib/env';
import { passwordResetEmail } from './email/password-reset-email';
import { verificationEmail } from './email/verificaton-email';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await passwordResetEmail({ user, url });
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await verificationEmail({ user, url });
		},
	},
	socialProviders: {
		github: {
			clientId: env.AUTH_GITHUB_CLIENT_ID,
			clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes
		},
	},
	plugins: [nextCookies()],
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
});
