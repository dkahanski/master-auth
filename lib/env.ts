import { z } from 'zod';

const EnvScheme = z.object({
	NODE_ENV: z.string(),
	DATABASE_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	AUTH_GITHUB_CLIENT_ID: z.string(),
	AUTH_GITHUB_CLIENT_SECRET: z.string(),
	RESEND_TOKEN: z.string(),
	RESEND_EMAIL_FROM: z.string(),
});

export type EnvScheme = z.infer<typeof EnvScheme>;

export default EnvScheme.parse(process.env);
