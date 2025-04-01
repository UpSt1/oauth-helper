import { type Integration, getIntegrationById } from './registry';

export type OAuthState = {
  integrationId: string;
  redirectUrl?: string;
  scopes?: string[];
};

export type OAuthConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
};

/**
 * Generates an OAuth URL for the specified integration
 */
export function generateOAuthUrl(integrationId: string, config: OAuthConfig, state?: OAuthState): string {
  const integration = getIntegrationById(integrationId);
  
  if (!integration) {
    throw new Error(`Integration with ID "${integrationId}" not found`);
  }
  
  // Handle different OAuth providers
  switch (integrationId) {
    case 'google':
      return generateGoogleOAuthUrl(config, state);
    // Add other providers as needed
    default:
      throw new Error(`OAuth URL generation not implemented for "${integrationId}"`);
  }
}

/**
 * Generates a Google OAuth URL
 */
function generateGoogleOAuthUrl(config: OAuthConfig, state?: OAuthState): string {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });
  
  if (state) {
    params.append('state', JSON.stringify(state));
  }
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Extracts OAuth configuration from integration fields
 */
export function getOAuthConfigFromIntegration(integration: Integration, fieldValues: Record<string, any>): OAuthConfig {
  return {
    clientId: fieldValues.client_id || '',
    clientSecret: fieldValues.client_secret || '',
    redirectUri: fieldValues.redirect_uri || '',
    scopes: Array.isArray(fieldValues.scopes) ? fieldValues.scopes : [],
  };
}
