import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'dropbox',
  tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
  clientIdKey: 'DROPBOX_CLIENT_ID',
  clientSecretKey: 'DROPBOX_CLIENT_SECRET'
});
