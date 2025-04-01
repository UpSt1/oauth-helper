import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'okta',
  authUrl: '{OKTA_DOMAIN}/oauth2/v1/authorize',
  clientIdKey: 'OKTA_CLIENT_ID',
  transformScopes: (scopes) => [...scopes, 'openid', 'profile']
});
