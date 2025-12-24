import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	IconArrowBack,
	IconUser,
	IconShield,
	IconKey,
	IconLink,
	IconTrash,
} from '@tabler/icons-react';

import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProfileUpdateForm from './_components/profile-update-form';
import { auth } from '@/lib/auth';
import SetPasswordButton from './_components/set-password-button';
import LoadingSuspense from '@/components/loading-suspense';
import ChangePasswordForm from './_components/change-password-form';

export default async function ProfilePage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (session === null) return redirect('auth/login');

	return (
		<div className="flex flex-col gap-8 max-w-4xl mx-auto my-6 px-4">
			<div>
				<Link href="/" className="flex gap-2">
					<IconArrowBack /> Back to home
				</Link>
			</div>
			<div className="flex gap-4 items-center">
				{session.user.image ? (
					<Image
						width={64}
						height={64}
						src={session.user.image}
						alt="User Avatar"
						className="object-cover rounded-xl"
					/>
				) : (
					<IconUser size={64} />
				)}
				<div className="flex flex-col">
					<div className="text-2xl">{session.user.name}</div>
					<div>{session.user.email}</div>
				</div>
			</div>
			<Tabs defaultValue="profile" className="mx-auto w-full my-6 ">
				<TabsList className="grid grid-cols-5 w-full">
					<TabsTrigger value="profile">
						<IconUser />
						<span className="max-sm:hidden">Profile</span>
					</TabsTrigger>
					<TabsTrigger value="security">
						<IconShield />
						<span className="max-sm:hidden">Security</span>
					</TabsTrigger>
					<TabsTrigger value="session">
						<IconKey />
						<span className="max-sm:hidden">Session</span>
					</TabsTrigger>
					<TabsTrigger value="accounts">
						<IconLink />
						<span className="max-sm:hidden">Accounts</span>
					</TabsTrigger>
					<TabsTrigger value="danger">
						<IconTrash />
						<span className="max-sm:hidden">Danger</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<Card>
						<CardContent>
							<ProfileUpdateForm user={session.user}></ProfileUpdateForm>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="security">
					<LoadingSuspense>
						<SecurityTab email={session.user.email} />
					</LoadingSuspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}

async function SecurityTab({ email }: { email: string }) {
	const userAccounts = await auth.api.listUserAccounts({
		headers: await headers(),
	});

	const hasPasswordAccounts = userAccounts.some(
		(a) => a.providerId === 'credential'
	);

	return (
		<div>
			{hasPasswordAccounts ? (
				<Card>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription>
							Update your password for improved security
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChangePasswordForm />
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardHeader>
						<CardTitle>Set Password</CardTitle>
						<CardDescription>
							We will send you a password reset email to set up a password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SetPasswordButton email={email} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}
