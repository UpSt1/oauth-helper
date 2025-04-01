import { json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { scopes } = await request.json();

  const state = crypto.randomBytes(16).toString('hex');
  cookies.set('github_oauth_state', state, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10 // 10 minutes
  });

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${process.env.API_URL}/api/oauth/github/callback`,
    scope: scopes.join(' '),
    state
  });

  return json({
    redirectURL: `https://github.com/login/oauth/authorize?${params}`
  });
};
