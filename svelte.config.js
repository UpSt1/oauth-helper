import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		})
	}
};

export default config;
