import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'github',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  clientIdKey: 'GITHUB_CLIENT_ID',
  clientSecretKey: 'GITHUB_CLIENT_SECRET'
});
