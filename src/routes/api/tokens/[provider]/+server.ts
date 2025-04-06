import { json, type RequestHandler } from '@sveltejs/kit';
import { getAllIntegrations } from '$lib/integrations/registry';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const { provider } = params;
	const integrations = getAllIntegrations();
	const integration = integrations.find((integration) => integration.id === provider);

	if (!integration) {
		return json({ error: 'Integration not found' }, { status: 404 });
	}

	const tokens = JSON.parse(cookies.get(`${integration?.id}_oauth_tokens`) || '[]');
	return json({ tokens });
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	const { provider } = params;
	const integrations = getAllIntegrations();

	const integration = integrations.find((integration) => integration.id === provider);

	if (!integration) {
		return json({ error: 'Integration not found' }, { status: 404 });
	}

	cookies.delete(`${integration.id}_oauth_tokens`, { path: '/' });
	return json({ success: true, message: `${provider} integration disconnected` });
};
