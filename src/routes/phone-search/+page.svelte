<script>
	import { Card, Text, Button, Input, Flex } from '@svelteuidev/core';
	let number = '';
	const print_number = () => {
		console.log(number);
	};
</script>

<main>
	<form method="POST" action="/phone-search">
		<Flex margin="auto" gap="sm">
			<Input
				type="number"
				style="flex-grow: 2"
				name="number"
				bind:value={number}
				placeholder="Enter phone number"
			/>
			<Button type="submit">Search</Button>
		</Flex>
	</form>
    <Card>
		<Card.Section>
			<Text><span style="font-weight: 400;">Name:</span> Karma Yoezer</Text>
		</Card.Section>
		<Card.Section>
			<Text><span style="font-weight: 400;">Phone Number:</span> (213) 189 2930</Text>
		</Card.Section>
		<Card.Section>
			<Text
				><span style="font-weight: 400;">Address</span> 270 Mohegan Ave, 06320 CT New London</Text
			>
		</Card.Section>
		<Card.Section>
			<Text><span style="font-weight: 400;">Type</span>Rental Customer</Text>
		</Card.Section>
	</Card>
</main>
