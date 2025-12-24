'use client';

import { ComponentProps, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { toast } from 'sonner';

export default function ActionButton({
	action,
	successMessage,
	...props
}: ComponentProps<typeof Button> & {
	successMessage?: string;
	action: () => Promise<{ error: null | { message?: string } }>;
}) {
	const [isPending, startTransition] = useTransition();

	const performAction = () => {
		startTransition(async () => {
			const data = await action();
			if (data.error) {
				toast.error(data.error.message);
			} else if (successMessage) {
				toast.success(successMessage);
			}
		});
	};

	return (
		<Button
			disabled={props.disabled ?? isPending}
			onClick={(e) => {
				performAction();
				props?.onClick?.(e);
			}}
			{...props}
		>
			<LoadingSwap isLoading={isPending}>{props.children}</LoadingSwap>
		</Button>
	);
}
