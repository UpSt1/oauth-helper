<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';

  let authUrl = $state('');
  let isLoading = $state(true);

  onMount(async () => {
    // Get the stored OAuth data
    const response = await fetch('/api/oauth/google/auth-url');
    if (response.ok) {
      const data = await response.json();
      authUrl = data.authUrl;
    }
    isLoading = false;
  });
</script>

<div class="container mx-auto max-w-3xl justify-center px-4 py-10">
  <Card.Root class="border-none shadow-lg">
    <Card.Header>
      <Card.Title class="text-center text-3xl font-bold">Google Authorization</Card.Title>
      <Card.Description class="text-center text-muted-foreground">
        Follow these steps to get your authorization code
      </Card.Description>
    </Card.Header>

    <Card.Content class="space-y-6 pt-6">
      {#if isLoading}
        <p class="text-center">Loading authorization URL...</p>
      {:else}
        <div class="space-y-4">
          <div class="space-y-2">
            <Label>Step 1: Click the button below to open Google's authorization page</Label>
            <div class="flex justify-center">
              <Button onclick={() => window.open(authUrl, '_blank')}>
                Open Google Authorization
              </Button>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Step 2: Sign in to your Google account and authorize the application</Label>
            <p class="text-sm text-muted-foreground">
              You'll be asked to grant the requested permissions to your application.
            </p>
          </div>

          <div class="space-y-2">
            <Label>Step 3: Copy the authorization code from the URL</Label>
            <p class="text-sm text-muted-foreground">
              After authorization, you'll be redirected to a URL that contains a code parameter.
              Copy this code to use in the next step.
            </p>
          </div>

          <div class="flex justify-center">
            <Button onclick={() => window.location.href = '/oauth/google/manual'}>
              Continue to Enter Code
            </Button>
          </div>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
