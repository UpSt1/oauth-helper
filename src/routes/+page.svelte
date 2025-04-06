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
	let searchTerm = $state('');

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
			window.open(result.redirectURL, 'oauth');
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

<div class="rounded-b-lg border-b shadow-sm">
	<div class="flex h-16 items-center justify-end px-6">
		<Button
			href="/tokens"
			class="rounded-md border-2 border-black bg-sky-300 px-4 py-2 font-bold text-black shadow-[4px_4px_0_#000] transition-all duration-200 hover:bg-yellow-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]"
		>
			View Tokens
		</Button>
	</div>
</div>

<Card.Content class="space-y-8 rounded-md border-2 border-black bg-white p-6 pt-6 shadow-[6px_6px_0_#000]">
	<div class="space-y-4">
		<div>
			<Input
				type="text"
				placeholder="Search integrations..."
				bind:value={searchTerm}
				class="w-full rounded-md border-2 border-black bg-sky-50 px-3 py-2 shadow-[4px_4px_0_#000] transition-all focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<Label for="integration" class="text-lg font-medium">Select Integration</Label>

		<div
			class="h-[30vh] overflow-y-auto rounded-md border-2 border-black bg-sky-50 p-3 shadow-[4px_4px_0_#000]"
		>
			<div class="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
				{#each integrations.filter((i) => i.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase())) as integration}
					<div
						class="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-black p-3 shadow-[3px_3px_0_#000] transition-all duration-200 hover:scale-105 hover:bg-yellow-200 focus:ring-2
						focus:ring-blue-400 focus:outline-none
						{selectedIntegration.name === integration.name ? ' bg-sky-300' : ' bg-sky-50'}"
						role="button"
						tabindex="0"
						aria-pressed={selectedIntegration.id === integration.id}
						aria-label={integration.name}
						onclick={() => handleChangeIntegration(integration)}
						onkeypress={() => handleChangeIntegration(integration)}
					>
						<div
							class="mb-1 flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-700"
						>
							<i class="fa-brands fa-{integration.icon}"></i>
						</div>
						<span class="text-center text-sm font-medium text-slate-900">{integration.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<form
		onsubmit={preventDefault(handleSubmit)}
		class="space-y-6 rounded-md border-2 border-black p-6 shadow-[6px_6px_0_#000]"
	>
		{#each Object.entries(selectedIntegration.fields) as [fieldName, field]}
			<div
				class="space-y-2 rounded-md border-2 border-black p-4 shadow-[4px_4px_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_#000]"
			>
				<Label for={fieldName} class="text-lg">{field.label}</Label>

				{#if field.type === 'text' || field.type === 'password'}
					<Input
						type={field.type}
						id={fieldName}
						bind:value={fieldValues[fieldName]}
						required={field.required}
						placeholder={`Enter ${field.label.toLowerCase()}`}
						class="rounded-md border-2 border-black bg-sky-50 px-3 py-2 shadow-[4px_4px_0_#000] transition-all focus:ring-2 focus:ring-blue-500"
					/>
				{:else if field.type === 'checkbox'}
					<div
						class="flex items-center space-x-3 rounded-sm border-2 border-black px-3 py-2 shadow-[2px_2px_0_#000]"
					>
						<Checkbox id={fieldName} bind:checked={fieldValues[fieldName]} class="text-blue-500" />
						<Label for={fieldName} class="text-slate-700">{field.label}</Label>
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
						<Select.Trigger
							class="w-full rounded-md border-2 border-black bg-sky-50 px-3 py-2 shadow-[4px_4px_0_#000] transition-all focus:ring-2 focus:ring-blue-500"
						>
							<Select.Value placeholder={`Select ${field.label.toLowerCase()}`} />
						</Select.Trigger>
						<Select.Content>
							{#each field.options || [] as option}
								<Select.Item value={option}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				{:else if field.type === 'multiselect'}
					<div class="rounded-md border-2 border-black p-4 pt-4 shadow-[4px_4px_0_#000]">
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							{#each field.options as scope}
								<div class="flex items-center space-x-2 rounded transition-all">
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
						<div class="flex gap-2 rounded-md border-2 border-black p-2 shadow-[4px_4px_0_#000]">
							<Input
								type="text"
								placeholder="Add new value"
								bind:value={customOption}
								class="rounded-sm border-2 border-black px-3 py-2 shadow-[2px_2px_0_#000] transition-all focus:ring-2 focus:ring-blue-500"
							/>
							<Button
								type="button"
								class="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-purple-600 hover:shadow-lg"
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
						<div class="mt-3 flex flex-wrap gap-2">
							{#each fieldValues[fieldName] as value}
								<div
									class="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-800"
								>
									{value}
									<button
										type="button"
										aria-label="Remove"
										class="ml-1 text-blue-600 transition-colors hover:text-blue-800"
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
			class="mt-8 w-full rounded-md border-2 border-black bg-sky-300 px-4 py-4 font-bold text-black shadow-[6px_6px_0_#000] transition-all duration-200 hover:bg-yellow-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#000]"
		>
			Generate Credentials
		</Button>
	</form>
</Card.Content>
