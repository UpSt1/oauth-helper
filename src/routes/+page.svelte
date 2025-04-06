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

<div class="container mx-auto max-w-4xl justify-center px-4 py-10 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
	<Card.Root class="border-none shadow-xl bg-white/90 backdrop-blur-sm">
		<Card.Header class="pb-6">
			<Card.Title class="text-center text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">OAuth Credential Generator</Card.Title>
			<Card.Description class="text-center text-muted-foreground mt-2">
				Configure your OAuth credentials for various integrations
			</Card.Description>
		</Card.Header>

		<div class="border-b">
			<div class="flex h-16 items-center justify-end px-4">
				<Button href="/tokens" class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
					View Tokens
				</Button>
			</div>
		</div>

		<Card.Content class="space-y-8 pt-6">
			<div class="space-y-4">
				<Label for="integration" class="text-lg font-medium">Select Integration</Label>
				
				<div class="h-[270px] overflow-y-auto rounded-lg border border-slate-200 p-3 bg-white">
					<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
						{#each integrations as integration}
							<div 
								class="flex flex-col items-center justify-center p-1.5 rounded-md border transition-all duration-200 cursor-pointer hover:shadow-sm hover:scale-105 {selectedIntegration.id === integration.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-300'}" onkeypress={() => handleChangeIntegration(integration)} role="button" tabindex="0" aria-pressed={selectedIntegration.id === integration.id} aria-label={integration.name} onclick={() => handleChangeIntegration(integration)}
							>
								<div class="w-6 h-6 flex items-center justify-center text-base mb-0.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
									<i class="fa-brands fa-{integration.icon}"></i>
								</div>
								<span class="text-center text-xs font-medium">{integration.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<form onsubmit={preventDefault(handleSubmit)} class="space-y-6">
				
				{#each Object.entries(selectedIntegration.fields) as [fieldName, field]}
					<div class="space-y-2 transition-all duration-300 hover:shadow-sm p-3 rounded-lg">
						<Label for={fieldName} class="font-medium">{field.label}</Label>

						{#if field.type === 'text' || field.type === 'password'}
							<Input
								type={field.type}
								id={fieldName}
								bind:value={fieldValues[fieldName]}
								required={field.required}
								placeholder={`Enter ${field.label.toLowerCase()}`}
								class="focus:ring-2 focus:ring-blue-500 transition-all"
							/>
						{:else if field.type === 'checkbox'}
							<div class="flex items-center space-x-2">
								<Checkbox id={fieldName} bind:checked={fieldValues[fieldName]} class="text-blue-500" />
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
								<Select.Trigger class="w-full focus:ring-2 focus:ring-blue-500 transition-all">
									<Select.Value placeholder={`Select ${field.label.toLowerCase()}`} />
								</Select.Trigger>
								<Select.Content>
									{#each field.options || [] as option}
										<Select.Item value={option}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{:else if field.type === 'multiselect'}
							<div class="space-y-4 p-3 bg-slate-50 rounded-lg">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									{#each field.options as scope}
										<div class="flex items-center space-x-2 p-2 rounded hover:bg-slate-100 transition-all">
											<Checkbox
												id={scope.id}
												checked={scope.selected || fieldValues[fieldName]?.includes(scope.id)}
												onCheckedChange={() => handleScopeChange(fieldName, scope.id)}
												class="text-blue-500"
											/>
											<Label for={scope.id} class="cursor-pointer">{scope.label}</Label>
										</div>
									{/each}
								</div>
							</div>
						{:else if field.type === 'multiinput'}
							<div class="space-y-2">
								<div class="flex gap-2">
									<Input 
										type="text" 
										placeholder="Add new value" 
										bind:value={customOption} 
										class="focus:ring-2 focus:ring-blue-500 transition-all"
									/>
									<Button
										type="button"
										class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all"
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
								<div class="flex flex-wrap gap-2 mt-3">
									{#each fieldValues[fieldName] as value}
										<div class="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-800">
											{value}
											<button
												type="button" aria-label="Remove"
												class="text-blue-600 hover:text-blue-800 transition-colors ml-1"
												onclick={() => {
													fieldValues[fieldName] = fieldValues[fieldName].filter(
														(v: string) => v !== value
													);
												}}
											>
												<i class="fa fa-times"></i>
											</button>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}

				<Button 
					type="submit" 
					class="w-full mt-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
				>
					Generate Credentials
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
