<script lang="ts">
  import { page } from '$app/stores';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';

  let tokens = $state(null);
  let provider = $page.url.searchParams.get('provider');

  onMount(async () => {
    // Fetch the tokens from cookies or server
    const response = await fetch(`/api/oauth/${provider}/tokens`);
    if (response.ok) {
      tokens = await response.json();
    }
  });
</script>

<div class="container mx-auto max-w-3xl justify-center px-4 py-10">
  <Card.Root class="border-none shadow-lg">
    <Card.Header>
      <Card.Title class="text-center text-3xl font-bold">OAuth Success</Card.Title>
      <Card.Description class="text-center text-muted-foreground">
        Your {provider} OAuth credentials have been generated successfully
      </Card.Description>
    </Card.Header>

    <Card.Content class="space-y-6 pt-6">
      {#if tokens}
        <div class="rounded-md bg-muted p-4">
          <pre class="overflow-auto text-sm">{JSON.stringify(tokens, null, 2)}</pre>
        </div>
      {:else}
        <p class="text-center">Loading tokens...</p>
      {/if}

      <div class="flex justify-center gap-4">
        <Button onclick={() => window.location.href = '/'}>
          Back to Home
        </Button>
        {#if tokens}
          <Button onclick={() => {
            navigator.clipboard.writeText(JSON.stringify(tokens));
            alert('Tokens copied to clipboard');
          }}>
            Copy Tokens
          </Button>
        {/if}
      </div>
    </Card.Content>
  </Card.Root>
</div>
