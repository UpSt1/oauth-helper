import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'square',
  tokenUrl: 'https://connect.squareup.com/oauth2/token',
  clientIdKey: 'SQUARE_CLIENT_ID',
  clientSecretKey: 'SQUARE_CLIENT_SECRET'
});
