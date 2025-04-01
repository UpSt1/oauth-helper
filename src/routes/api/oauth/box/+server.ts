import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'box',
  authUrl: 'https://account.box.com/api/oauth2/authorize',
  clientIdKey: 'BOX_CLIENT_ID'
});
