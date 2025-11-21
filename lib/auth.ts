import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { createAuthMiddleware } from 'better-auth/api';
import env from '@/lib/env';
import { db } from '@/lib/db/db';
import { passwordResetEmail } from '@/lib/email/password-reset-email';
import { verificationEmail } from '@/lib/email/verificaton-email';
import { sendWelcomeEmail } from '@/lib/email/welcom-email';

export const auth = betterAuth({
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({ user, url, newEmail }) => {
				await verificationEmail({
					user: { ...user, email: newEmail },
					url,
				});
			},
		},
	},
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
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.startsWith('/sign-up')) {
				const user = ctx.context.newSession?.user ?? {
					name: ctx.body.name,
					email: ctx.body.email,
				};

				if (user !== null) {
					await sendWelcomeEmail(user);
				}
			}
		}),
	},
});
