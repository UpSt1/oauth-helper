<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Alert, AlertDescription } from "$lib/components/ui/alert";
	import * as ScrollArea from "$lib/components/ui/scroll-area";
	import { onMount } from "svelte";

	let loading = true;
	let error: string | null = null;
	let integrations: any[] = [];

	// Fetch integrations data
	onMount(async () => {
		try {
			const response = await fetch('/api/tokens');
			integrations = await response.json();
			loading = false;
		} catch (e: any) {
			error = e.message;
			loading = false;
		}
	});


	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	function hideString(str: string, start: number, end: number) {
		const startStr = str.substring(0, start);
		const endStr = str.substring(str.length - end);
		return startStr + '**'.repeat(20) + endStr;
	}
</script>

<div class="container mx-auto p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-center text-3xl font-bold">OAuth Credential Generator</Card.Title>
			<Card.Description class="text-center">
				Connected Integrations
			</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-6 pt-6">
			{#if loading}
				<div class="flex justify-center">
					<p>Loading integrations...</p>
				</div>
			{:else if error}
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			{:else if integrations.length === 0}
				<Alert>
					<AlertDescription>No integrations connected yet.</AlertDescription>
				</Alert>
			{:else}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each integrations as integration}
						{#each integration.tokens as token}
							<Card.Root>
								<Card.Header>
									<div class="flex items-center">
										<i class="fa-brands fa-{integration.icon} mr-3"></i>
										<Card.Title class="capitalize">{integration.provider}</Card.Title>
									</div>
								</Card.Header>
								<Card.Content class="space-y-4">
									<div>
										<p class="font-medium mb-1">Access Token:</p>
										<ScrollArea.Root class="w-full rounded-md border px-2">
												<div class="flex items-center justify-between">
													<code class="break-all text-sm">{hideString(token.access_token, 10, 10)}</code>
													<Button 
														variant="ghost" 
														size="sm"
														onclick={() => copyToClipboard(token.access_token)}
													>
														<i class="fa fa-clipboard"></i>
													</Button>
												</div>
											<ScrollArea.Scrollbar orientation="horizontal" />
										</ScrollArea.Root>
									</div>

									{#if token.refresh_token}
										<div>
											<p class="font-medium mb-1">Refresh Token:</p>
											<ScrollArea.Root class="w-full rounded-md border px-2">
													<div class="flex items-center justify-between">
														<code class="break-all text-sm">{hideString(token.refresh_token, 10, 10)}</code>
														<Button 
															variant="ghost" 
															size="sm"
															onclick={() => copyToClipboard(token.refresh_token)}
														>
															<i class="fa fa-copy"></i>
														</Button>
													</div>
												<ScrollArea.Scrollbar orientation="horizontal" />
											</ScrollArea.Root>
										</div>
									{/if}

									{#if token.expiry_date}
										<div>
											<p class="font-medium mb-1">Expires:</p>
											<p class="text-sm">{new Date(token.expiry_date).toLocaleString()}</p>
										</div>
									{/if}

									<Button
										variant="destructive"
										size="sm"
										class="w-full"
										onclick={() =>
											window.confirm('Are you sure you want to disconnect this integration?') &&
											fetch(`/api/tokens/${integration.provider}`, { method: 'DELETE' }).then(() =>
												window.location.reload()
											)}
									>
										Disconnect
									</Button>
								</Card.Content>
							</Card.Root>
						{/each}
					{/each}
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
