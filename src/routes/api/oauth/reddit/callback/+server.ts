import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'reddit',
  tokenUrl: 'https://www.reddit.com/api/v1/access_token',
  clientIdKey: 'REDDIT_CLIENT_ID',
  clientSecretKey: 'REDDIT_CLIENT_SECRET',
  transformTokenRequest: (code) => ({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${process.env.API_URL}/api/oauth/reddit/callback`
  })
});
