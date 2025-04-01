import "dotenv/config";

import { json, type RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json();

  // Sign In Button integration
  if (!data.client_id) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      `${process.env.API_URL}/api/oauth/google/callback`
    );

    const state = Math.random().toString(36).substring(2);
    cookies.set('google_oauth_state', state, {
      path: '/api', httpOnly: true, sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 5 // 5 mins
    });

    const authorizationUrl = oauth2Client.generateAuthUrl({
      scope: data.scopes, access_type: 'offline',
      include_granted_scopes: true, state: state,
      redirect_uri: `${process.env.API_URL}/api/oauth/google/callback`
    });

    return json({ redirectURL: authorizationUrl.toString() });
  }

  // Store the credentials in cookies or session for later use in the callback
  cookies.set('google_oauth_data', JSON.stringify(data), {
    path: '/', httpOnly: true, sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 // 1 hour
  });

  // For Manual Credentials flow, redirect to the authorization guide page
  return json({ redirectURL: '/oauth/google/authorize' });
};
