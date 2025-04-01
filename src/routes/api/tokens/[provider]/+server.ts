import { json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params, cookies }) => {
  const { provider } = params;
  
  if (provider === 'google') {
    cookies.delete('google_oauth_tokens', { path: '/' });
  }
  // Add other providers as needed
  // else if (provider === 'github') {
  //   cookies.delete('github_oauth_tokens', { path: '/' });
  // }
  
  return json({ success: true, message: `${provider} integration disconnected` });
};
