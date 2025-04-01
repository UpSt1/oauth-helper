import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'reddit',
  authUrl: 'https://www.reddit.com/api/v1/authorize',
  clientIdKey: 'REDDIT_CLIENT_ID',
  extraParams: {
    duration: 'permanent'
  }
});
