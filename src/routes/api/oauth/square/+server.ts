import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'square',
  authUrl: 'https://connect.squareup.com/oauth2/authorize',
  clientIdKey: 'SQUARE_CLIENT_ID',
  scopeDelimiter: '+'
});
