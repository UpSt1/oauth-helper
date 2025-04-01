import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'gitlab',
  authUrl: 'https://gitlab.com/oauth/authorize',
  clientIdKey: 'GITLAB_CLIENT_ID'
});
