'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const forgotPasswordScheme = z.object({
	email: z.email().min(1),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordScheme>;

export default function ForgotPasswordTab({
	openSigninTab,
}: {
	openSigninTab: () => void;
}) {
	const form = useForm<ForgotPasswordForm>({
		resolver: zodResolver(forgotPasswordScheme),
		defaultValues: {
			email: '',
		},
	});
	const { isSubmitting } = form.formState;

	const handleSignUp = async (data: ForgotPasswordForm) => {
		await authClient.requestPasswordReset(
			{
				...data,
				redirectTo: '/auth/reset-password',
			},
			{
				onError: (error) => {
					toast.error(
						error.error.message || 'Failed to send password reset email'
					);
				},
				onSuccess: () => {
					toast.success('Password reset email sent');
				},
			}
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-8">
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between">
					<Button variant="outline" onClick={() => openSigninTab()}>
						Back
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						<LoadingSwap isLoading={isSubmitting}>Send Reset Email</LoadingSwap>
					</Button>
				</div>
			</form>
		</Form>
	);
}
