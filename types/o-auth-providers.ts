import { type Icon, IconBrandGithub } from '@tabler/icons-react';

export const SUPORTED_OAUTH_PROVIDERS = ['github'] as const;
export type SuportedOAuthProviders = (typeof SUPORTED_OAUTH_PROVIDERS)[number];

export const SUPORTED_OAUTH_PROVIDERS_DETAILS: Record<
	SuportedOAuthProviders,
	{
		name: string;
		Icon: Icon;
	}
> = { github: { name: 'GitHub', Icon: IconBrandGithub } };
