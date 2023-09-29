<script>
	import { SimpleGrid, Card, Text, Button, Input, Flex } from '@svelteuidev/core';
	export let data;
	let number = '';
	const getName = (record) => {
		return `${record['First Name']} ${record['Last Name']}`;
	};

	const getAddy = (record) => {
		return `${record['Street Address']}, ${record['City']}, ${record['State']}, ${record['Zip']}`;
	};

	const handleNumber = (e) => {
		let num = e.target.value
		const split_number = num.split('').filter((n) => !isNaN(n) && n !== ' ');
		console.log(split_number);
		let res = ''
		split_number.forEach((num,i) => {
			if (i === 0) {
				res = `(${num}`
			} else if (i === 2) {
				res += `${num}) `
			} else if (i === 5) {
				res += `${num}-`
			} else if (i <= 9) {
				res += num
			}
		})
		number = res
	};
</script>

<main>
	<form method="POST" action="/phone-search">
		<Flex margin="auto" gap="sm">
			<Input
				style="flex-grow: 2"
				name="number"
				on:input={handleNumber}
				bind:value={number}
				placeholder="Enter phone number"
			/>
			<Button type="submit">Search</Button>
		</Flex>
	</form>
	<SimpleGrid style="margin: 1em" cols={2} >
		{#each data.records as record}
			<Card style="padding: 2em">
				<Card.Section style="margin-bottom: 1em">
					<Text><span style="font-weight: 400;">Name:</span>{getName(record.fields)}</Text>
				</Card.Section>
				<Card.Section style="margin-bottom: 1em">
					<Text
						><span style="font-weight: 400;">Phone Number:</span>{record?.fields?.[
							'Phone Number'
						]}</Text
					>
				</Card.Section>
				<Card.Section style="margin-bottom: 1em">
					<Text><span style="font-weight: 400;">Address: </span>{getAddy(record.fields)}</Text>
				</Card.Section>
			</Card>
		{/each}
	</SimpleGrid>
</main>
