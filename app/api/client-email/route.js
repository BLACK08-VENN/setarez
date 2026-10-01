import { checkBotId } from 'botid/server';
import { emailSchema, createEnquiryHandler } from '../../../lib/enquiries.mjs';

export const runtime = 'nodejs';
export const POST = createEnquiryHandler({
  schema: emailSchema,
  verifyBot: async () => (await checkBotId({ checkLevel: 'basic' })).isBot !== false,
  compose: ({ email }) => ({
    subject: 'New client email from the Setarez website',
    text: `A client submitted their email through the Setarez website:\n\n${email}`,
  }),
});
