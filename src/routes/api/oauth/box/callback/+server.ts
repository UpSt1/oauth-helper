import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'box',
  tokenUrl: 'https://api.box.com/oauth2/token',
  clientIdKey: 'BOX_CLIENT_ID',
  clientSecretKey: 'BOX_CLIENT_SECRET'
});
