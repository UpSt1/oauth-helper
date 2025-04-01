import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'facebook',
  tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
  clientIdKey: 'FACEBOOK_CLIENT_ID',
  clientSecretKey: 'FACEBOOK_CLIENT_SECRET'
});
