'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Session } from 'better-auth';
import SessionCard from './session-card';
import ActionButton from '@/components/action-button';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SessionManagement({
	sessions,
	currentSessionToken,
}: {
	sessions: Array<Session>;
	currentSessionToken: string;
}) {
	const router = useRouter();
	const otherSessions = sessions.filter(
		(session) => session.token !== currentSessionToken
	);
	const currentSession = sessions.find(
		(session) => session.token === currentSessionToken
	);

	function revolveOtherSessions() {
		return authClient.revokeOtherSessions(undefined, {
			onSuccess: () => {
				router.refresh();
			},
		});
	}

	return (
		<Card>
			<CardContent>
				{currentSession && (
					<SessionCard session={currentSession} isCurrentSession={true} />
				)}
				<div className="my-4 flex justify-between items-center">
					<h3 className="text-lg font-medium">Other Active Sessions</h3>
					{!!otherSessions.length && (
						<ActionButton variant="destructive" action={revolveOtherSessions}>
							Revoke Other Sessions
						</ActionButton>
					)}
				</div>
				<div>
					{otherSessions.length
						? otherSessions.map((session) => (
								<SessionCard key={session.id} session={session} />
						  ))
						: 'Other Sessions Empty '}
				</div>
			</CardContent>
		</Card>
	);
}
