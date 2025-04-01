import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'salesforce',
  tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
  clientIdKey: 'SALESFORCE_CLIENT_ID',
  clientSecretKey: 'SALESFORCE_CLIENT_SECRET'
});
