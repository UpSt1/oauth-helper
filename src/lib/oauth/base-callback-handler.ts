import { redirect, type RequestHandler } from '@sveltejs/kit';
import { tryCatch } from '$lib/try-catch';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

interface CallbackConfig {
  provider: string;
  tokenUrl: string;
  clientIdKey: string;
  clientSecretKey: string;
  transformTokenRequest?: (code: string) => Record<string, string>;
  transformTokenResponse?: (response: any) => TokenResponse;
}

export function createCallbackHandler(config: CallbackConfig): RequestHandler {
  return async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const { provider, tokenUrl, clientIdKey, clientSecretKey } = config;

    if (error) {
      return redirect(303, `/oauth/error?message=${error}`);
    }

    if (!code) {
      return redirect(303, '/oauth/error?message=No%20authorization%20code%20received');
    }

    if (!state || state !== cookies.get(`${provider}_oauth_state`)) {
      return redirect(303, '/oauth/error?message=Invalid%20state%20received');
    }

    try {
      const tokenRequestBody = config.transformTokenRequest?.(code) ?? {
        grant_type: 'authorization_code',
        code,
        client_id: process.env[clientIdKey]!,
        client_secret: process.env[clientSecretKey]!,
        redirect_uri: `${process.env.API_URL}/api/oauth/${provider}/callback`
      };

      const { data: response, error: tokenError } = await tryCatch(
        fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(tokenRequestBody)
        }).then(res => res.json())
      );

      if (tokenError) {
        return redirect(303, `/oauth/error?message=${tokenError}`);
      }

      const tokens = config.transformTokenResponse?.(response) ?? response;

      cookies.set(`${provider}_oauth_tokens`, JSON.stringify(tokens), {
        path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60,
        secure: process.env.NODE_ENV === 'production'
      });

      return redirect(303, `/oauth/success?provider=${provider}`);
    } catch (error) {
      return redirect(303, `/oauth/error?message=Failed%20to%20exchange%20code%20for%20token`);
    }
  };
}
