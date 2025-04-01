import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  const tokensStr = cookies.get('google_oauth_tokens');
  
  if (!tokensStr) {
    return new Response('No tokens found', { status: 404 });
  }
  
  const tokens = JSON.parse(tokensStr);
  
  // Return the tokens to the client
  return json(tokens);
};
