<script>
	import { TextInput } from '@svelteuidev/core';
	import { CONTACT_MODAL, formatNumber } from '$lib/utils/contacts-utils.js';
	export let modalData = { ...CONTACT_MODAL };
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
<TextInput
	required
	label="Street Address"
	name="Street Address"
	bind:value={modalData['Street Address']}
/>
<TextInput required label="City" name="City" bind:value={modalData['City']} />
<TextInput required label="Zip" name="Zip" bind:value={modalData['Zip']} />
<TextInput required label="State" name="State" bind:value={modalData['State']} />
