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
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const signUpSchene = z.object({
	name: z.string().min(1),
	email: z.email().min(1),
	password: z.string().min(6),
});

type SignUpForm = z.infer<typeof signUpSchene>;

export default function SignUpTab({
	openEmailVerificationTab,
}: {
	openEmailVerificationTab: (email: string) => void;
}) {
	const form = useForm<SignUpForm>({
		resolver: zodResolver(signUpSchene),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});
	const { isSubmitting } = form.formState;

	const handleSignUp = async (data: SignUpForm) => {
		const res = await authClient.signUp.email(
			{ ...data },
			{
				onError: (error) => {
					toast.error(error.error.message || 'Filed to Sign Up');
				},
			}
		);

		if (res.error == null && !res.data.user.emailVerified) {
			openEmailVerificationTab(data.email);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-8">
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isSubmitting}>
					<LoadingSwap isLoading={isSubmitting}>Sign Up</LoadingSwap>
				</Button>
			</form>
		</Form>
	);
}
