import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'salesforce',
  authUrl: 'https://login.salesforce.com/services/oauth2/authorize',
  clientIdKey: 'SALESFORCE_CLIENT_ID'
});
