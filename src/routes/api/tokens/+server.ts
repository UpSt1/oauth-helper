import { json, type RequestHandler } from '@sveltejs/kit';
import { getAllIntegrations } from '$lib/integrations/registry';

export const GET: RequestHandler = async ({ cookies }) => {
	const integrations = getAllIntegrations();

	return json(
		integrations
			.map((integration) => ({
				provider: integration.id,
				icon: integration.icon,
				tokens: JSON.parse(
          cookies.get(`${integration.id}_oauth_tokens`)
          || '[]'
        )
			}))
			.filter((integration) => integration.tokens.length > 0)
	);
};
export const DELETE: RequestHandler = async ({ request, cookies }) => {
	const { provider, tokenId } = await request.json();

	const cookieName = `${provider}_oauth_tokens`;
	const tokensRaw = cookies.get(cookieName) || '[]';
	let tokens: any[] = [];

	try {
		tokens = JSON.parse(tokensRaw);
	} catch {
		tokens = [];
	}

	const filteredTokens = tokens.filter((t) => t.id !== tokenId);

	cookies.set(cookieName, JSON.stringify(filteredTokens), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	});

	return json({ success: true });
};
