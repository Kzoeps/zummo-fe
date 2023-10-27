<script>
	import {
		Notification,
		Modal,
		SimpleGrid,
		Card,
		Text,
		Button,
		Input,
		Flex,
		TextInput
	} from '@svelteuidev/core';
	import { CONTACT_MODAL, formatNumber } from '$lib/utils/contacts-utils.js';
	import ContactInfo from '$lib/components/contacts/contact-info.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import MdiPen from 'virtual:icons/mdi/pen';

	export let data;
	export let form;
	let number = '';
	let showModal = false;
	let showCreationModal = false;
	let modalData = {};
	let phoneNumberSearch = $page.url.searchParams.get('number');

	const handleModalOpen = () => {
		showModal = true;
		modalData = data?.records?.[0]?.fields ? { ...data.records[0].fields } : {};
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
		number = formatNumber(num);
	};

	const handleOpenCreateModal = (e) => {
		e.preventDefault();
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
			<Button type="submit">Search</Button>
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
					on:click={handleModalOpen}
					style="width: 50px; border-radius: 50%; height: 50px; position: absolute; right: -10px; top: -10px"
					><MdiPen /></Button
				>
			</div>
		{/each}
	</SimpleGrid>
	<Modal opened={showModal} on:close={closeModal} title="Details">
		<form method="POST" action="?/updateRecord" use:enhance>
			<input name="id" type="hidden" value={data.records[0].id} />
			<ContactInfo {modalData} />
			<Flex gap="sm" mt={10} justify="right">
				<Button variant="outline" on:click={closeModal}>Cancel</Button>
				<Button type="submit" on:click={() => console.log(data)}>Save</Button>
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
</main>
