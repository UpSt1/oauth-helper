import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'microsoft',
  tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  clientIdKey: 'MICROSOFT_CLIENT_ID',
  clientSecretKey: 'MICROSOFT_CLIENT_SECRET'
});
