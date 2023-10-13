<script>
	import { Modal, SimpleGrid, Card, Text, Button, Input, Flex, TextInput } from '@svelteuidev/core';
	import MdiPen from 'virtual:icons/mdi/pen';

	export let data;
	let number = '';
	let showModal = false;
	let modalData = {};

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

	// all the logic below is to format the phone number like this: (214) 180-1323
	// since it is saved like this in airtable and we need to filter and search for it in the exact fashion
	// lemme know if you have a smarter way to do this.
	const formatNumber = (number) => {
		const individualNumbers = number.split('').filter((n) => !isNaN(n) && n !== ' ');
		let formattedNumber = '';
		individualNumbers.forEach((num, i) => {
			if (i === 0) {
				formattedNumber = `(${num}`;
			} else if (i === 2) {
				formattedNumber += `${num})`;
			} else if (i == 3) {
				formattedNumber += ` ${num}`;
			} else if (i === 5) {
				formattedNumber += `${num}-`;
			} else {
				formattedNumber += num;
			}
		});
		return formattedNumber;
	};

	const handleNumber = (e) => {
		let num = e.target.value;
		number = formatNumber(num);
	};

	const checkNumberValidity = (number) => {
		const formattedNumber = formatNumber(number);
		modalData['Phone Number'] = formattedNumber;
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
			<Button>Create</Button>
		</Flex>
	</form>
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
		<form method="POST" action="?/updateRecord">
			<input name="id" type="hidden" value={data.records[0].id} />
			<TextInput
				required
				label="First Name"
				name="First Name"
				bind:value={modalData['First Name']}
			/>
			<TextInput required label="Last Name" name="Last Name" bind:value={modalData['Last Name']} />
			<TextInput
				required
				label="Phone Number"
				name="Phone Number"
				maxlength="14"
				bind:value={modalData['Phone Number']}
				on:input={(e) => checkNumberValidity(e.target.value)}
			/>
			<TextInput
				required
				label="Street Address"
				name="Street Address"
				bind:value={modalData['Street Address']}
			/>
			<TextInput required label="City" name="City" bind:value={modalData['City']} />
			<TextInput required label="Zip" name="Zip" bind:value={modalData['Zip']} />
			<TextInput required label="State" name="State" bind:value={modalData['State']} />
			<Flex gap="sm" mt={10} justify="right">
				<Button variant="outline" on:click={closeModal}>Cancel</Button>
				<Button type="submit" on:click={() => console.log(data)}>Save</Button>
			</Flex>
		</form>
	</Modal>
</main>
