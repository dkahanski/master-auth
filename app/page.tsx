'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function Home() {
	const { data: session, isPending: loadinig } = authClient.useSession();

	if (loadinig) return <h1>Loading...</h1>;

	return (
		<div className="my-6 px-4 max-w-md mx-auto">
			<div className="text-center space-y-6">
				{session == null ? (
					<>
						<h1>Wellcom to Auth Master</h1>
						<Button asChild size="lg">
							<Link href="/auth/login">Sign In / Sign Up</Link>
						</Button>
					</>
				) : (
					<>
						<h1>Wellcom {session.user.name}!</h1>
						<Button
							size="lg"
							variant="destructive"
							onClick={() => authClient.signOut()}
						>
							Sign Out
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
