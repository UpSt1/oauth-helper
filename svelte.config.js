import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	kit: {
		adapter: adapter({
			runtime: "nodejs22.x"
		})
	}
};

export default config;
