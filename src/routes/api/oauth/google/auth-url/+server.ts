import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  const oauthDataStr = cookies.get('google_oauth_data');
  
  if (!oauthDataStr) {
    return new Response('No OAuth configuration found', { status: 404 });
  }
  
  const oauthData = JSON.parse(oauthDataStr);
  
  // Generate the authorization URL
  const scopes = oauthData.scopes.join(' ');
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  
  authUrl.searchParams.append('client_id', oauthData.client_id);
  authUrl.searchParams.append('redirect_uri', oauthData.redirect_uri);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', scopes);
  authUrl.searchParams.append('access_type', 'offline');
  authUrl.searchParams.append('prompt', 'consent');
  authUrl.searchParams.append('state', Math.random().toString(36).substring(2));
  
  return json({ authUrl: authUrl.toString() });
};
