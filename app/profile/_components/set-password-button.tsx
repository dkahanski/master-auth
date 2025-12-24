'use client';

import ActionButton from '@/components/action-button';
import { authClient } from '@/lib/auth-client';

export default function SetPasswordButton({ email }: { email: string }) {
	return (
		<ActionButton
			variant="outline"
			successMessage="Password reset email sent"
			action={() => {
				return authClient.requestPasswordReset({
					email,
					redirectTo: `/auth/reset-password`,
				});
			}}
		>
			Send Password Reset Email
		</ActionButton>
	);
}
