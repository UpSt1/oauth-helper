<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let tokens = $state<string[] | null>(null);
	let provider = $page.url.searchParams.get('provider');

	onMount(async () => {
		// Fetch the tokens from cookies or server
		const response = await fetch(`/api/oauth/${provider}/tokens`);
		if (response.ok) {
      tokens = await response.json();
    } else {
      tokens = [];
    }
	});
</script>

<div class="border-b">
	<div class="flex h-16 items-center justify-end gap-4 px-4">
		<Button href="/">Back to Home</Button>
		{#if tokens}
			<Button
				onclick={() => {
					navigator.clipboard.writeText(JSON.stringify(tokens));
					alert('Tokens copied to clipboard');
				}}
			>
				Copy Tokens
			</Button>
		{/if}
	</div>
</div>

<Card.Content class="space-y-8 pt-6">
	{#if tokens}
		<div class="bg-muted rounded-md p-4">
			<pre class="overflow-auto text-sm">{JSON.stringify(tokens, null, 2)}</pre>
		</div>
	{:else if tokens === null}
		<p class="text-center">Loading tokens...</p>
	{:else}
		<p class="text-center">No tokens...</p>
	{/if}
</Card.Content>
