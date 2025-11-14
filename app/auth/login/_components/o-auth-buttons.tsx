'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import {
	SUPORTED_OAUTH_PROVIDERS,
	SUPORTED_OAUTH_PROVIDERS_DETAILS,
} from '@/types/o-auth-providers';

export default function OAuthButtons() {
	return SUPORTED_OAUTH_PROVIDERS.map((provider) => {
		const Icon = SUPORTED_OAUTH_PROVIDERS_DETAILS[provider].Icon;
		return (
			<Button
				key={provider}
				variant="outline"
				onClick={() => {
					authClient.signIn.social({ provider, callbackURL: '/' });
				}}
			>
				<Icon />
				{SUPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
			</Button>
		);
	});
}
