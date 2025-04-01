import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'linkedin',
  authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  clientIdKey: 'LINKEDIN_CLIENT_ID'
});
