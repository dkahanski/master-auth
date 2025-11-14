'use client';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export function EmailVerification({ email }: { email: string }) {
	const [loading, setLoading] = useState(false);
	return (
		<div className="space-y-4">
			<p className="text-sm text-muted-foreground mt-2">
				We sent you a verification link. Please check your email and click the
				link to verify your account.
			</p>
			<Button
				onClick={async () => {
					setLoading(true);
					await authClient.sendVerificationEmail({ email, callbackURL: '/' });
					setLoading(false);
				}}
			>
				<LoadingSwap isLoading={loading}>Resend Email</LoadingSwap>
			</Button>
		</div>
	);
}
