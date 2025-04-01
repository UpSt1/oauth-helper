import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'pinterest',
  authUrl: 'https://www.pinterest.com/oauth',
  clientIdKey: 'PINTEREST_CLIENT_ID'
});
