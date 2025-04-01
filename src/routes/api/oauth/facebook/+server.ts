import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'facebook',
  authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
  clientIdKey: 'FACEBOOK_CLIENT_ID',
  scopeDelimiter: ','
});
