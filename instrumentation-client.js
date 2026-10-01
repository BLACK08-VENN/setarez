import { initBotId } from 'botid/client/core';

initBotId({ protect: [
  { path: '/api/contact', method: 'POST', advancedOptions: { checkLevel: 'basic' } },
  { path: '/api/client-email', method: 'POST', advancedOptions: { checkLevel: 'basic' } },
] });
