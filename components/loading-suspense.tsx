import { IconLoader2 } from '@tabler/icons-react';
import { ReactNode, Suspense } from 'react';

export default function LoadingSuspense({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={<IconLoader2 className="size-20 animate-spin" />}>
			{children}
		</Suspense>
	);
}
