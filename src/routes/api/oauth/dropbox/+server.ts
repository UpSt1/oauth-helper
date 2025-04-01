import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'dropbox',
  authUrl: 'https://www.dropbox.com/oauth2/authorize',
  clientIdKey: 'DROPBOX_CLIENT_ID',
  extraParams: {
    token_access_type: 'offline'
  }
});
