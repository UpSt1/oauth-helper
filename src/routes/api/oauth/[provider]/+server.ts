import "dotenv/config";
import { json } from '@sveltejs/kit';

export async function POST({ params, request }) {
    const { provider } = params;
    const data = await request.json();

    // Example OAuth configuration
    const config = {
        clientId: process.env[`${provider.toUpperCase()}_CLIENT_ID`],
        clientSecret: process.env[`${provider.toUpperCase()}_CLIENT_SECRET`],
        redirectUri: `${process.env.BASE_URL}/api/oauth/${provider}/callback`,
        scope: data.scopes?.join(' ') || ''
    };

    // Build OAuth URL with dynamic parameters
    const authUrl = new URL(`https://oauth.${provider}.com/authorize`);
    authUrl.searchParams.set('client_id', config.clientId!);
    authUrl.searchParams.set('redirect_uri', config.redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', config.scope);

    return json({ redirectURL: authUrl.toString() });
}
