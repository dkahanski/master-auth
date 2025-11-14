'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInTab from './_components/sign-in-tab';
import SignUpTab from './_components/sign-up-tab';
import { Separator } from '@/components/ui/separator';
import OAuthButtons from './_components/o-auth-buttons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { EmailVerification } from './_components/email-verification';

type Tab = 'signin' | 'signup' | 'email-verification';

export default function LoginPage() {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState<Tab>('signin');
	const [email, setEmail] = useState<string>('');

	useEffect(() => {
		authClient.getSession().then((session) => {
			if (session.data !== null) {
				router.push('/');
			}
		});
	}, [router]);

	function openEmailVerificationTab(email: string) {
		setEmail(email);
		setSelectedTab('email-verification');
	}

	useEffect(() => {
		console.log(selectedTab);
	}, [selectedTab]);

	return (
		<Tabs
			value={selectedTab}
			onValueChange={(v) => setSelectedTab(v as Tab)}
			className="mx-auto w-full my-6 px-4"
		>
			{(selectedTab === 'signin' || selectedTab === 'signup') && (
				<TabsList>
					<TabsTrigger value="signin">Sign In</TabsTrigger>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
				</TabsList>
			)}
			<TabsContent value="signin">
				<Card>
					<CardHeader>
						<CardTitle className="text-bold">Sign In</CardTitle>
					</CardHeader>
					<CardContent>
						<SignInTab openEmailVerificationTab={openEmailVerificationTab} />
					</CardContent>
					<Separator />
					<CardFooter>
						<OAuthButtons />
					</CardFooter>
				</Card>
			</TabsContent>

			<TabsContent value="signup">
				<Card>
					<CardHeader>
						<CardTitle>Sign Up</CardTitle>
					</CardHeader>
					<CardContent>
						<SignUpTab openEmailVerificationTab={openEmailVerificationTab} />
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="email-verification">
				<Card>
					<CardHeader>
						<CardTitle>Verify your email</CardTitle>
					</CardHeader>
					<CardContent>
						<EmailVerification email={email} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
