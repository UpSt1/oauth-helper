import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'linkedin',
  tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
  clientIdKey: 'LINKEDIN_CLIENT_ID',
  clientSecretKey: 'LINKEDIN_CLIENT_SECRET'
});
