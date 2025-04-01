import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'microsoft',
  authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  clientIdKey: 'MICROSOFT_CLIENT_ID'
});
