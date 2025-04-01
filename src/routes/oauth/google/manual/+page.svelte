<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';

  let authorizationCode = $state('');
  let clientId = $state('');
  let clientSecret = $state('');
  let redirectUri = $state('');
  let isLoading = $state(false);
  let error = $state('');

  onMount(async () => {
    // Get the stored OAuth data
    const response = await fetch('/api/oauth/google/config');
    if (response.ok) {
      const data = await response.json();
      clientId = data.client_id;
      clientSecret = data.client_secret;
      redirectUri = data.redirect_uri;
    }
  });

  async function handleSubmit() {
    isLoading = true;
    error = '';

    try {
      const response = await fetch('/api/oauth/google/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: authorizationCode,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri
        })
      });

      if (response.ok) {
        window.location.href = '/oauth/success?provider=google';
      } else {
        const data = await response.json();
        error = data.message || 'Failed to exchange code for token';
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container mx-auto max-w-3xl justify-center px-4 py-10">
  <Card.Root class="border-none shadow-lg">
    <Card.Header>
      <Card.Title class="text-center text-3xl font-bold">Manual Google OAuth</Card.Title>
      <Card.Description class="text-center text-muted-foreground">
        Enter the authorization code you received from Google
      </Card.Description>
    </Card.Header>

    <Card.Content class="space-y-6 pt-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="authorizationCode">Authorization Code</Label>
          <Input
            type="text"
            id="authorizationCode"
            bind:value={authorizationCode}
            required
            placeholder="Enter the authorization code from Google"
          />
        </div>

        {#if error}
          <div class="rounded-md bg-destructive/10 p-4 text-destructive">
            <p>{error}</p>
          </div>
        {/if}

        <Button 
          type="button" 
          class="w-full" 
          disabled={isLoading || !authorizationCode}
          onclick={handleSubmit}
        >
          {isLoading ? 'Processing...' : 'Exchange Code for Token'}
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
</div>
