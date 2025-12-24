import ActionButton from '@/components/action-button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Session } from 'better-auth';
import { UAParser } from 'ua-parser-js';
import {
	IconTrash,
	IconDeviceMobile,
	IconDeviceDesktop,
} from '@tabler/icons-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
export default function SessionCard({
	session,
	isCurrentSession = false,
}: {
	session: Session;
	isCurrentSession?: boolean;
}) {
	const router = useRouter();
	const userAgentInfo = session.userAgent ? UAParser(session.userAgent) : null;

	function getBrowserInformation() {
		if (userAgentInfo == null) return 'Unknown Device';
		if (userAgentInfo.browser.name == null && userAgentInfo.os.name == null) {
			return 'Unknown Device';
		}

		if (userAgentInfo.browser.name == null) return userAgentInfo.os.name;
		if (userAgentInfo.os.name == null) return userAgentInfo.browser.name;

		return `${userAgentInfo.browser.name}, ${userAgentInfo.os.name}`;
	}

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat(undefined, {
			dateStyle: 'medium',
			timeStyle: 'short',
		}).format(new Date(date));
	}

	function revokeSession() {
		return authClient.revokeSession(
			{
				token: session.token,
			},
			{
				onSuccess: () => {
					router.refresh();
				},
			}
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex justify-between">
					{getBrowserInformation()}{' '}
					{isCurrentSession && <Badge>Current Session</Badge>}
				</CardTitle>
				<CardDescription>
					<div className="flex justify-between">
						<div className="flex justify-center gap-4">
							{userAgentInfo?.device.type === 'mobile' ? (
								<IconDeviceMobile size={32} />
							) : (
								<IconDeviceDesktop size={32} />
							)}
							<div>
								<p className="text-sm text-muted-foreground">
									Created: {formatDate(session.createdAt)}
								</p>
								<p className="text-sm text-muted-foreground">
									Expires: {formatDate(session.expiresAt)}
								</p>
							</div>
						</div>
						{!isCurrentSession && (
							<ActionButton variant="destructive" action={revokeSession}>
								<IconTrash />
							</ActionButton>
						)}
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
