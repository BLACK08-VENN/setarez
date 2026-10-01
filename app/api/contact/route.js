import { checkBotId } from 'botid/server';
import { contactSchema, createEnquiryHandler } from '../../../lib/enquiries.mjs';

export const runtime = 'nodejs';
export const POST = createEnquiryHandler({
  schema: contactSchema,
  verifyBot: async () => (await checkBotId({ checkLevel: 'basic' })).isBot !== false,
  compose: ({ name, email, project }) => ({
    subject: `New website enquiry from ${name}`,
    text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\nProject details:\n${project}`,
  }),
});
