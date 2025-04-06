<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import '@fortawesome/fontawesome-free/js/fontawesome.js';
	import '@fortawesome/fontawesome-free/js/brands.js';

	import '../app.css';

	let { children } = $props();
</script>

<div class="container mx-auto my-10 min-h-screen max-w-4xl justify-center p-6">
	<Card.Root class="rounded-md border-2 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
		<Card.Header class="mb-4 pb-6">
			<Card.Title class="text-center text-4xl font-extrabold text-black"
				>OAuth Credential Generator</Card.Title
			>
			<Card.Description class="mt-2 text-center text-lg text-black">
				Configure your OAuth credentials for various integrations
			</Card.Description>
		</Card.Header>

		{@render children()}
		<p class="mt-6 text-center text-black text-sm">
			⚠️ Your tokens are never stored. You can view the source code on
			<a href="https://github.com/7HR4IZ3/oauth-helper" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-600">
				GitHub
			</a>. ⚠️
		</p>

		<p class="mt-6 text-lg font-semibold text-black text-center">
			Made with <span class="text-red-500">❤️</span> by
			<a href="https://github.com/7HR4IZ3" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-600">
				Thraize
			</a>
		</p>
	</Card.Root>
</div>
