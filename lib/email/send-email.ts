import { Resend } from 'resend';
import env from '../env';

interface SendEmailProps {
	to: string;
	subject: string;
	html: string;
}

const resend = new Resend(env.RESEND_TOKEN);

export default async function sendEmail({ to, subject, html }: SendEmailProps) {
	try {
		const { data, error } = await resend.emails.send({
			from: env.RESEND_EMAIL_FROM,
			to,
			subject,
			html,
		});

		// if (error) {
		// 	return Response.json({ error }, { status: 500 });
		// }

		// return Response.json(data);
	} catch (error) {
		// return Response.json({ error }, { status: 500 });
	}
}
