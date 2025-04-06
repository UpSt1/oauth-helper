import "dotenv/config";
import { redirect } from '@sveltejs/kit';

export async function GET({ params, url }) {
    const { provider } = params;
    const code = url.searchParams.get('code');

    try {
        // Exchange code for tokens
        const tokenResponse = await fetch(`https://oauth.${provider}.com/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env[`${provider.toUpperCase()}_CLIENT_ID`],
                client_secret: process.env[`${provider.toUpperCase()}_CLIENT_SECRET`],
                code,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BASE_URL}/api/oauth/${provider}/callback`
            })
        });

        const tokens = await tokenResponse.json();

        // Store tokens securely (implement your storage logic)
        // Example: saveTokens(provider, tokens);

        throw redirect(303, `/oauth/success?provider=${provider}`);
    } catch (error: any) {
        throw redirect(303, `/oauth/error?message=${error.message}`);
    }
}
