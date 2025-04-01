import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  const integrations = [];
  
  // Check for Google tokens
  const googleTokensStr = cookies.get('google_oauth_tokens');
  if (googleTokensStr) {
    try {
      const tokens = JSON.parse(googleTokensStr);
      integrations.push({
        provider: 'google',
        tokens,
        icon: 'google'
      });
    } catch (error) {
      console.error('Error parsing Google tokens:', error);
    }
  }
  
  // Add other integrations here as needed
  // Example:
  // const githubTokensStr = cookies.get('github_oauth_tokens');
  // if (githubTokensStr) {
  //   try {
  //     const tokens = JSON.parse(githubTokensStr);
  //     integrations.push({
  //       provider: 'github',
  //       tokens,
  //       icon: '/icons/github.svg'
  //     });
  //   } catch (error) {
  //     console.error('Error parsing GitHub tokens:', error);
  //   }
  // }
  
  return json(integrations);
};
