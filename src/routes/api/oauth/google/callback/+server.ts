import { google } from 'googleapis';
import { tryCatch } from '$lib/try-catch';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const error = url.searchParams.get('error');

	if (error) {
		// Handle error case
		return redirect(303, `/oauth/error?message=${error}`);
	}

	if (!code) {
		return redirect(303, '/oauth/error?message=No%20authorization%20code%20received');
	}

	if (!state || state !== cookies.get('google_oauth_state')) {
		return redirect(303, '/oauth/error?message=Invalid%20state%20received');
	}

	try {
		// // Get the stored OAuth data
		// const oauthDataStr = cookies.get('google_oauth_data');
		// if (!oauthDataStr) {
		//   return redirect(303, '/oauth/error?message=No OAuth configuration found');
		// }

		// const oauthData = JSON.parse(oauthDataStr);

		// Exchange the code for tokens
		const oauth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID!,
			process.env.GOOGLE_CLIENT_SECRET!,
			`${process.env.API_URL}/api/oauth/google/callback`
		);

		const { data: response, error } = await tryCatch(oauth2Client.getToken(code));

		if (error) {
			return redirect(
				303,
				`/oauth/error?message=` + `${error || 'Failed%20to%20exchange%20code%20for%20token'}`
			);
		}

		const { tokens } = response;
		oauth2Client.setCredentials(tokens);

		// // Store the tokens or return them to the user
		// cookies.set('google_oauth_tokens', JSON.stringify(tokens), {
		// 	path: '/',
		// 	httpOnly: true,
		// 	sameSite: 'lax',
		// 	secure: process.env.NODE_ENV === 'production',
		// 	maxAge: 60 * 60 // 1 hour
		// });

    const setCookie = async (name: string, value: any) => {
      cookies.set(name, value, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 // 1 hour
      });
    }

    const storedTokens = cookies.get('google_oauth_tokens');
    if (!storedTokens) {
      setCookie('google_oauth_tokens', JSON.stringify([tokens]));
    } else {
      setCookie('google_oauth_tokens', JSON.stringify([
        ...JSON.parse(storedTokens), tokens
      ]));
    }

		// Redirect to success page with the tokens
		return redirect(303, '/oauth/success?provider=google');
	} catch (error) {
		console.error('Error in Google OAuth callback:', error);
		return redirect(
			303,
			`/oauth/error?message=${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
};
