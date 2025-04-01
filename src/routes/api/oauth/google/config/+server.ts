import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  const oauthDataStr = cookies.get('google_oauth_data');
  
  if (!oauthDataStr) {
    return new Response('No OAuth configuration found', { status: 404 });
  }

  const oauthData = JSON.parse(oauthDataStr);

  return json({
    client_id: oauthData.client_id,
    client_secret: oauthData.client_secret,
    redirect_uri: oauthData.redirect_uri
  });
};
