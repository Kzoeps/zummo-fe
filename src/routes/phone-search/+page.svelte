<script>
	import { SimpleGrid, Card, Text, Button, Input, Flex } from '@svelteuidev/core';
	import MdiPen from 'virtual:icons/mdi/pen';

	export let data;
	let number = '';
	const getName = (record) => {
		return `${record['First Name']} ${record['Last Name']}`;
	};

	const getAddy = (record) => {
		return `${record['Street Address']}, ${record['City']}, ${record['State']}, ${record['Zip']}`;
	};

	// all the logic below is to format the phone number like this: (214) 180-1323
	// since it is saved like this in airtable and we need to filter and search for it in the exact fashion
	// lemme know if you have a smarter way to do this.
	const handleNumber = (e) => {
		let num = e.target.value;
		const split_number = num.split('').filter((n) => !isNaN(n) && n !== ' ');
		let res = '';
		split_number.forEach((num, i) => {
			if (i === 0) {
				res = `(${num}`;
			} else if (i === 2) {
				res += `${num}) `;
			} else if (i === 5) {
				res += `${num}-`;
			} else {
				res += num;
			}
		});
		number = res;
	};
</script>

<main>
	<form method="POST" action="/phone-search">
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
					style="width: 50px; border-radius: 50%; height: 50px; position: absolute; right: -10px; top: -10px"
					><MdiPen /></Button
				>
			</div>
		{/each}
	</SimpleGrid>
</main>
