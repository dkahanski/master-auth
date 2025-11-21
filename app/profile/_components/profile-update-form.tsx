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
import { useRouter } from 'next/navigation';

const profileUpdateSchema = z.object({
	name: z.string().min(1),
	email: z.email().min(1),
});

type ProfileUpdateForm = z.infer<typeof profileUpdateSchema>;

export default function ProfileUpdateForm({
	user,
}: {
	user: { name: string; email: string };
}) {
	const router = useRouter();
	const form = useForm<ProfileUpdateForm>({
		resolver: zodResolver(profileUpdateSchema),
		defaultValues: user,
	});
	const { isSubmitting } = form.formState;

	const handleProfileUpdate = async (data: ProfileUpdateForm) => {
		const promises = [
			authClient.updateUser({
				name: data.name,
			}),
		];

		if (data.email !== user.email) {
			promises.push(
				authClient.changeEmail({
					newEmail: data.email,
					callbackURL: '/profile',
				})
			);
		}

		const result = await Promise.all(promises);
		const updateUserResult = result[0];
		const emailResult = result[1] ?? { error: false };

		if (updateUserResult.error) {
			toast.error(
				updateUserResult.error.message || 'Failed to update profile.'
			);
		} else if (emailResult.error) {
			toast.error(emailResult.error.message || 'Failed to update email.');
		} else {
			if (data.email !== user.email) {
				toast.success('Verify your new email address to complete the change.');
			} else {
				toast.success('Profile update successfully.');
			}
			router.refresh();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleProfileUpdate)}
				className="space-y-8"
			>
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
				<Button type="submit" disabled={isSubmitting}>
					<LoadingSwap isLoading={isSubmitting}>Update Profile</LoadingSwap>
				</Button>
			</form>
		</Form>
	);
}
