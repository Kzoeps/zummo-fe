<script>
	import { Alert } from '@svelteuidev/core';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ContactInfo from '$lib/components/contacts/contact-info.svelte';
	import { CONTACT_MODAL, formatNumber } from '$lib/utils/contacts-utils.js';
	import { Button, Card, Flex, Input, Modal, SimpleGrid, Text } from '@svelteuidev/core';

	import MdiPen from 'virtual:icons/mdi/pen';

	// data from the load function in +page.server.js
	export let data;
	// data from the actions in +page.server.js
	export let form;
	let activeId = '';
	let number = '';
	let showSnackbar = false;
	// showModal is for update
	let showModal = false;
	// showCreationModal is the state to decide whether to show create modal
	let showCreationModal = false;
	let modalData = {};
	// just for binding the ui with the searchParams. So that when you go to a link eg: `http://localhost:3000/contacts?number=1234567890`, the input field will be filled with the number 1234567890.
	let phoneNumberSearch = $page.url.searchParams.get('number');

	$: if (form?.success) {
		showSnackbar = true;
		showModal = false;
		setTimeout(() => {
			showSnackbar = false;
		}, 2000);
	}

	const handleModalOpen = (id) => {
		showModal = true;
		activeId = id;
		const recordData = data?.records?.find((record) => record.id === id)?.fields;
		modalData = recordData ? { ...recordData } : {};
	};
	const getName = (record) => {
		return `${record['First Name']} ${record['Last Name']}`;
	};

	const getAddy = (record) => {
		return `${record['Street Address']}, ${record['City']}, ${record['State']}, ${record['Zip']}`;
	};

	const closeModal = () => {
		showModal = false;
	};

	const handleNumber = (e) => {
		let num = e.target.value;
		// formatNumber is a function that formats number in a way that has been saved on airtable, so in this format: (xxx) xxx-xxxx
		number = formatNumber(num);
	};

	const handleOpenCreateModal = (e) => {
		e.preventDefault();
		// CONTACT_MODAL is an object which holds the default values (basically empty strings) for each of the fields.
		modalData = { ...CONTACT_MODAL };
		showCreationModal = true;
	};
</script>

<main>
	<form method="POST" action="?/searchRecord">
		<Flex margin="auto" gap="sm">
			<Input
				style="flex-grow: 2"
				name="number"
				maxlength="14"
				on:input={handleNumber}
				bind:value={number}
				placeholder="Enter phone number"
			/>
			<Button style="background-color: rgb(34,139,230)" type="submit">Search</Button>
			<Button on:click={handleOpenCreateModal}>Create</Button>
		</Flex>
	</form>
	{#if data.records.length === 0 && phoneNumberSearch}
		<h1 style="margin-top: 40px">No records found</h1>
	{/if}
	<SimpleGrid style="margin: 1em" cols={2}>
		{#each data.records as record}
			<div style="position: relative">
				<Card style="padding: 2em">
					<Card.Section style="margin-bottom: 1em">
						<Text><span style="font-weight: bold;">Name: </span>{getName(record.fields)}</Text>
					</Card.Section>
					<Card.Section style="margin-bottom: 1em">
						<Text
							><span style="font-weight: bold;">Phone Number: </span>{record?.fields?.[
								'Phone Number'
							]}</Text
						>
					</Card.Section>
					<Card.Section style="margin-bottom: 1em">
						<Text><span style="font-weight: bold;">Address: </span>{getAddy(record.fields)}</Text>
					</Card.Section>
				</Card>
				<Button
					on:click={() => handleModalOpen(record.id)}
					style="width: 50px; border-radius: 50%; height: 50px; position: absolute; right: -10px; top: -10px"
					><MdiPen /></Button
				>
			</div>
		{/each}
	</SimpleGrid>
	<Modal opened={showModal} on:close={closeModal} title="Details">
		<form method="POST" action="?/updateRecord" use:enhance>
			<input name="id" type="hidden" value={activeId} />
			<ContactInfo {modalData} />
			<Flex gap="sm" mt={10} justify="right">
				<Button variant="outline" on:click={closeModal}>Cancel</Button>
				<Button
					type="submit"
					style="background-color: rgb(34,139,230)"
					on:click={() => console.log(data)}>Save</Button
				>
			</Flex>
		</form>
	</Modal>
	<Modal
		opened={showCreationModal}
		on:close={() => {
			showCreationModal = false;
		}}
		title="Create Contact"
	>
		<form method="POST" action="?/createRecord" use:enhance>
			<ContactInfo {form} {modalData} />
			<Flex gap="sm" mt={10} justify="right">
				<Button variant="outline" on:click={closeModal}>Cancel</Button>
				<Button>Create</Button>
			</Flex>
		</form>
	</Modal>
	{#if showSnackbar}
		<Alert style="position: absolute; bottom: 4rem; right: 3rem" title="Success!" color="green">
			{form?.message}
		</Alert>
	{/if}
	
</main>
