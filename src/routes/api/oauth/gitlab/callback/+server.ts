import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'gitlab',
  tokenUrl: 'https://gitlab.com/oauth/token',
  clientIdKey: 'GITLAB_CLIENT_ID',
  clientSecretKey: 'GITLAB_CLIENT_SECRET'
});
