import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'slack',
  tokenUrl: 'https://slack.com/api/oauth.v2.access',
  clientIdKey: 'SLACK_CLIENT_ID',
  clientSecretKey: 'SLACK_CLIENT_SECRET',
  transformTokenResponse: (response) => ({
    access_token: response.access_token,
    refresh_token: response.refresh_token,
    expires_in: response.expires_in,
    token_type: 'Bearer'
  })
});
