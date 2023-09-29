<script>
	import { Button, Input, Flex } from '@svelteuidev/core';
	let number = '';

    const print_number = () => {
    }
</script>

<main>
	<Flex margin="auto" gap="sm">
		<Input type="number" style="flex-grow: 2" bind:value={number} placeholder="Enter phone number" />
        <Button on:click={print_number} >Search</Button>
	</Flex>
</main>
