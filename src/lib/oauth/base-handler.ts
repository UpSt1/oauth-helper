import "dotenv/config";

import crypto from 'crypto';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface OAuthConfig {
  provider: string;
  authUrl: string;
  clientIdKey: string;
  scopeDelimiter?: string;
  extraParams?: Record<string, string>;
  transformScopes?: (scopes: string[]) => string[];
}

export function createOAuthHandler(config: OAuthConfig): RequestHandler {
  return async ({ request, cookies }) => {
    const { scopes } = await request.json();
    const state = crypto.randomBytes(16).toString('hex');
    const {
      provider,
      authUrl,
      clientIdKey,
      scopeDelimiter = ' ',
      extraParams = {},
      transformScopes = (s) => s
    } = config;

    cookies.set(`${provider}_oauth_state`, state, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10
    });

    const params = new URLSearchParams({
      response_type: 'code', state,
      client_id: process.env[clientIdKey]!,
      redirect_uri: `${process.env.API_URL}/api/oauth/${provider}/callback`,
      scope: transformScopes(scopes).join(scopeDelimiter),
      ...extraParams
    });

    return json({
      redirectURL: `${authUrl}?${params}`
    });
  };
}
