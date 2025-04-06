<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	const errorMessage = $page.url.searchParams.get('message') || 'An unknown error occurred';
</script>

<div class="border-b">
	<div class="flex h-16 items-center justify-end px-4">
		<Button href="/" class="transition-all duration-300">Back Home</Button>
	</div>
</div>


<Card.Content class="space-y-6 pt-6">
	<div class="bg-destructive/10 text-destructive rounded-md p-4">
		<p>{errorMessage}</p>
	</div>
</Card.Content>
