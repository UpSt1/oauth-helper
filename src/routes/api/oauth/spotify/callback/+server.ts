import { createCallbackHandler } from '$lib/oauth/base-callback-handler';

export const GET = createCallbackHandler({
  provider: 'spotify',
  tokenUrl: 'https://accounts.spotify.com/api/token',
  clientIdKey: 'SPOTIFY_CLIENT_ID',
  clientSecretKey: 'SPOTIFY_CLIENT_SECRET',
  transformTokenRequest: (code) => ({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${process.env.API_URL}/api/oauth/spotify/callback`,
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET!
  })
});
