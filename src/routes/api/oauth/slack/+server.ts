import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'slack',
  authUrl: 'https://slack.com/oauth/v2/authorize',
  clientIdKey: 'SLACK_CLIENT_ID',
  extraParams: {
    user_scope: 'identity.basic'
  }
});
