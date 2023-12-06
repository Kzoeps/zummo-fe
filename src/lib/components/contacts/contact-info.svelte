<script>
	import { Alert } from '@svelteuidev/core';
	import { NativeSelect, Text, TextInput } from '@svelteuidev/core';
	import { CONTACT_MODAL, formatNumber } from '$lib/utils/contacts-utils.js';
	export let modalData = { ...CONTACT_MODAL };
	export let form;
	const checkNumberValidity = (number) => {
		const formattedNumber = formatNumber(number);
		modalData['Phone Number'] = formattedNumber;
	};
</script>

<TextInput required label="First Name" name="First Name" bind:value={modalData['First Name']} />
<TextInput required label="Last Name" name="Last Name" bind:value={modalData['Last Name']} />
<TextInput
	required
	label="Phone Number"
	name="Phone Number"
	maxlength="14"
	bind:value={modalData['Phone Number']}
	on:input={(e) => checkNumberValidity(e.target.value)}
/>
{#if form?.inExistence}
	<Text color="red">Contact already exists</Text>
{/if}
<TextInput
	required
	label="Street Address"
	name="Street Address"
	bind:value={modalData['Street Address']}
/>
<TextInput required label="City" name="City" bind:value={modalData['City']} />
<TextInput required label="Zip" name="Zip" bind:value={modalData['Zip']} />
<NativeSelect
	required
	label="State"
	name="State"
	data={['PA', 'NJ']}
	bind:value={modalData['State']}
/>