import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'instagram',
  authUrl: 'https://api.instagram.com/oauth/authorize',
  clientIdKey: 'INSTAGRAM_CLIENT_ID'
});
