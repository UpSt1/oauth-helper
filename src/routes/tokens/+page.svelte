<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import * as ScrollArea from '$lib/components/ui/scroll-area';
	import { onMount } from 'svelte';

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

<div class="rounded-b-lg shadow-sm">
	<div class="flex h-16 items-center justify-end px-6">
		<Button
			href="/"
			class="rounded-md border-2 border-black bg-sky-300 px-4 py-2 font-bold text-black shadow-[4px_4px_0_#000] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-yellow-200 hover:shadow-[2px_2px_0_#000]"
		>
			Back Home
		</Button>
	</div>
</div>

<Card.Content
	class="space-y-8 rounded-md border-2 border-black bg-white p-6 pt-6 shadow-[6px_6px_0_#000]"
>
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
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each integrations as integration}
				{#each integration.tokens as token}
					<Card.Root
						class="flex h-80 flex-col justify-between rounded-md border-2 border-black bg-sky-50 p-4 shadow-[4px_4px_0_#000] transition-transform duration-200 hover:scale-105 hover:shadow-[6px_6px_0_#000]"
					>
						<Card.Header class="border-b-2 border-black p-4">
							<div class="flex items-center">
								<i class="fa-brands fa-{integration.icon} mr-3"></i>
								<Card.Title class="font-bold capitalize">{integration.provider}</Card.Title>
							</div>
						</Card.Header>
						<Card.Content class="space-y-6 p-4">
							<div>
								<p class="mb-1 font-medium">Access Token:</p>
								<ScrollArea.Root
									class="w-full rounded-md border-2 border-black px-2 shadow-[2px_2px_0_#000]"
								>
									<code class="text-sm break-all">{hideString(token.access_token, 10, 10)}</code>
									<ScrollArea.Scrollbar orientation="horizontal" />
								</ScrollArea.Root>
								<div class="mt-2 flex justify-end">
									<Button
										variant="ghost"
										size="sm"
										class="rounded-md border-2 border-black bg-sky-300 px-2 py-1 font-bold text-black shadow-[2px_2px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-yellow-200 hover:shadow-[1px_1px_0_#000]"
										onclick={() => {
											copyToClipboard(token.access_token);
											alert('Access token copied!');
										}}
										title="Copy access token"
									>
										<i class="fa-solid fa-copy"></i>
									</Button>
								</div>
							</div>

							{#if token.refresh_token}
								<div>
									<p class="mb-1 font-medium">Refresh Token:</p>
									<ScrollArea.Root
										class="w-full rounded-md border-2 border-black px-2 shadow-[2px_2px_0_#000]"
									>
										<code class="text-sm break-all">{hideString(token.refresh_token, 10, 10)}</code>
										<ScrollArea.Scrollbar orientation="horizontal" />
									</ScrollArea.Root>
									<div class="mt-2 flex justify-end">
										<Button
											variant="ghost"
											size="sm"
											class="rounded-md border-2 border-black bg-sky-300 px-2 py-1 font-bold text-black shadow-[2px_2px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-yellow-200 hover:shadow-[1px_1px_0_#000]"
											onclick={() => {
												copyToClipboard(token.refresh_token);
												alert('Refresh token copied!');
											}}
											title="Copy refresh token"
										>
											<i class="fa fa-solid fa-copy"></i>
										</Button>
									</div>
								</div>
							{/if}

							{#if token.expiry_date}
								<div>
									<p class="mb-1 font-medium">Expires:</p>
									<p class="text-sm">{new Date(token.expiry_date).toLocaleString()}</p>
								</div>
							{/if}

							<Button
								variant="destructive"
								size="sm"
								class="w-full rounded-md border-2 border-black bg-red-300 px-4 py-2 font-bold text-black shadow-[4px_4px_0_#000] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-yellow-200 hover:shadow-[2px_2px_0_#000]"
								onclick={async () => {
									if (window.confirm('Are you sure you want to delete this token?')) {
										await fetch('/api/tokens', {
											method: 'DELETE',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify({
												provider: integration.provider,
												tokenId: token.id
											})
										});
										window.location.reload();
									}
								}}
								title="Delete token"
							>
								<i class="fa fa-solid fa-trash mr-2"></i> Delete Token
							</Button>
						</Card.Content>
					</Card.Root>
				{/each}
			{/each}
		</div>
	{/if}
</Card.Content>
