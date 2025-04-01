import { createOAuthHandler } from '$lib/oauth/base-handler';

export const POST = createOAuthHandler({
  provider: 'spotify',
  authUrl: 'https://accounts.spotify.com/authorize',
  clientIdKey: 'SPOTIFY_CLIENT_ID'
});
