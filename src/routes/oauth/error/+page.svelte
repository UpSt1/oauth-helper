<script lang="ts">
  import { page } from '$app/stores';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';

  const errorMessage = $page.url.searchParams.get('message') || 'An unknown error occurred';
</script>

<div class="container mx-auto max-w-3xl justify-center px-4 py-10">
  <Card.Root class="border-none shadow-lg">
    <Card.Header>
      <Card.Title class="text-center text-3xl font-bold text-destructive">OAuth Error</Card.Title>
      <Card.Description class="text-center text-muted-foreground">
        There was a problem with the OAuth process
      </Card.Description>
    </Card.Header>

    <Card.Content class="space-y-6 pt-6">
      <div class="rounded-md bg-destructive/10 p-4 text-destructive">
        <p>{errorMessage}</p>
      </div>

      <div class="flex justify-center">
        <Button onclick={() => window.location.href = '/'}>
          Back to Home
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
</div>
