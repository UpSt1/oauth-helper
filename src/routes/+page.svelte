<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { getAllIntegrations, type Integration } from '$lib/integrations/registry';
	import { preventDefault } from 'svelte/legacy';

	const integrations = getAllIntegrations();

	let customOption = $state('');
	let selectedIntegration = $state(integrations[0]);
	let fieldValues: Record<string, any> = $state(getDefaultValues());
	let shownFields: Record<string, boolean> = $state({});

	function getDefaultValues() {
		return Object.entries(selectedIntegration.fields).reduce((values: any, [fieldName, field]) => {
			if (field.type === 'multiselect' || field.type === 'multiinput') {
				values[fieldName] = field.options.filter((item) => item.selected).map((item) => item.id);
			} else if (field.type === 'select') {
				values[fieldName] = field.options[0];
			} else {
				values[fieldName] = field.default;
			}
			return values;
		}, {});
	}

	async function handleSubmit() {
		const response = await fetch(`/api/oauth/${selectedIntegration.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(fieldValues)
		});

		if (response.ok) {
			const result = await response.json();
			window.open(result.redirectURL, "oauth");
		} else {
			alert('Something went wrong. Please try again later.');
		}
	}

	function handleScopeChange(fieldName: string, scope: string) {
		const selectedScopes = fieldValues[fieldName] || new Array();

		fieldValues[fieldName] = selectedScopes.includes(scope)
			? selectedScopes.filter((s: any) => s !== scope)
			: [...selectedScopes, scope];
	}

	function handleChangeIntegration(value: Integration) {
		customOption = '';
		selectedIntegration = value;
		fieldValues = getDefaultValues();
	}
</script>

<div class="container mx-auto max-w-3xl justify-center px-4 py-10">
	<Card.Root class="border-none shadow-lg">
		<Card.Header>
			<Card.Title class="text-center text-3xl font-bold">OAuth Credential Generator</Card.Title>
			<Card.Description class="text-center text-muted-foreground">
				Configure your OAuth credentials for various integrations
			</Card.Description>
		</Card.Header>

		
			<div class="border-b">
				<div class="flex h-16 items-center justify-end  px-4">
					<Button href="/tokens">
						View Tokens
					</Button>
				</div>
			</div>

		<Card.Content class="space-y-6 pt-6">
			<div class="space-y-2">
				<Label for="integration">Select Integration</Label>
				<Select.Root
					selected={{
						value: selectedIntegration,
						label: selectedIntegration.name
					}}
					onSelectedChange={(selected) => {
						if (selected) handleChangeIntegration(
							selected.value as Integration
						);
					}}
				>
				<Select.Trigger class="w-full">
						<Select.Label>
							<i class="fa-brands fa-integration mr-3"></i>
						</Select.Label>
						<Select.Value placeholder="Select an integration" />
					</Select.Trigger>
					<Select.Content>
						{#each integrations as integration}
							<Select.Item value={integration}>
								<i class="fa-brands fa-{integration.icon} mr-3"></i>
								{integration.name}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<form onsubmit={preventDefault(handleSubmit)} class="space-y-4">
				{#each Object.entries(selectedIntegration.fields) as [fieldName, field]}
					<div class="space-y-2">
						<Label for={fieldName}>{field.label}</Label>

						{#if field.type === 'text' || field.type === 'password'}
							<Input
								type={field.type}
								id={fieldName}
								bind:value={fieldValues[fieldName]}
								required={field.required}
								placeholder={`Enter ${field.label.toLowerCase()}`}
							/>
						{:else if field.type === 'checkbox'}
							<div class="flex items-center space-x-2">
								<Checkbox id={fieldName} bind:checked={fieldValues[fieldName]} />
								<Label for={fieldName}>{field.label}</Label>
							</div>
						{:else if field.type === 'select'}
							<Select.Root
								selected={{
									value: fieldValues[fieldName],
									label: fieldValues[fieldName].label
								}}
								onSelectedChange={(selected) => {
									if (selected) {
										fieldValues[fieldName] = selected.value;
									}
								}}
							>
								<Select.Trigger class="w-full">
									<Select.Value placeholder={`Select ${field.label.toLowerCase()}`} />
								</Select.Trigger>
								<Select.Content>
									{#each field.options || [] as option}
										<Select.Item value={option}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{:else if field.type === 'multiselect'}
							<div class="space-y-4">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									{#each field.options as scope}
										<div class="flex items-center space-x-2">
											<Checkbox
												id={scope.id}
												checked={scope.selected || fieldValues[fieldName]?.includes(scope.id)}
												onCheckedChange={() => handleScopeChange(fieldName, scope.id)}
											/>
											<Label for={scope.id} class="cursor-pointer">{scope.label}</Label>
										</div>
									{/each}
								</div>
							</div>
						{:else if field.type === 'multiinput'}
							<div class="space-y-2">
								<div class="flex gap-2">
									<Input type="text" placeholder="Add new value" bind:value={customOption} />
									<Button
										type="button"
										onclick={() => {
											if (!field.options.find((option) => option.id === customOption)) {
												field.options.push({
													id: customOption,
													label: customOption,
													selected: true
												});
											}
											fieldValues[fieldName].push(customOption);
											customOption = '';
										}}
									>
										Add
									</Button>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each fieldValues[fieldName] as value}
										<div class="sm flex items-center gap-2 rounded bg-secondary p-2">
											{value}
											<Button
												class="text-muted-foreground hover:text-primary"
												onclick={() => {
													fieldValues[fieldName] = fieldValues[fieldName].filter(
														(v: string) => v !== value
													);
												}}
											>
												<i class="fa fa-times"></i>
											</Button>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}

				<Button type="submit" class="w-full">Generate Credentials</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>

