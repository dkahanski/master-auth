import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';
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
			</Tabs>
		</div>
	);
}
