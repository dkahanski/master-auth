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
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
	email: z.email().min(1),
	password: z.string().min(6),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInTab() {
	const router = useRouter();
	const form = useForm<SignInForm>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { isSubmitting } = form.formState;

	const handleSignIn = async (data: SignInForm) => {
		authClient.signIn.email(
			{ ...data },
			{
				onError: (error) => {
					toast.error(error.error.message || 'Filed to Sign Up');
				},
				onSuccess: () => {
					router.push('/');
				},
			}
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-8">
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
					<LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
				</Button>
			</form>
		</Form>
	);
}
