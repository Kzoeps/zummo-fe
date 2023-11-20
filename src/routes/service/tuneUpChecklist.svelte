<script>
    import { SvelteUIProvider, Textarea, Modal, Button, TextInput, Accordion, Checkbox} from '@svelteuidev/core';
    import { serviceDataStore } from './dataStore';
    import { onMount } from 'svelte';

    let serviceData;
    serviceDataStore.subscribe((value) => {
        serviceData = value;
        // Check if data is defined before calling updateCheckboxes
        if (serviceData) {
            updateCheckboxes();
        }
    });

    function updateCheckboxes(){
        //Check if there is defined data
        if (serviceData[0]?.fields['Service Performed']) {
            // Get the "Service Performed" text from the data
            const servicePerformedText = serviceData[0].fields["Service Performed"];

            // Split the text into lines
            const lines = servicePerformedText.split('\n');

            // Define checkbox labels here to bind them later
            const checkboxLabels = [
                "Front Tire", "Rear Tire", "Tubes",
                "Headset & Stem", "Seatpost/Dropper",
                "Suspension Fork", "Rear Shock",
                "Chain", "Cassette", "Crank/Chainring", "Cables/Housing", "Shifters/Derailleurs",
                "Pedals", "Grips/Tape",
                "Rims", "Spokes", "Hubs", "Skewer/Bolt",
                "Capliers", "Levers", "Pads & Rotors /Rim Surface", "Cables & Housing"
            ];

            //Iterate through the lines
            lines.forEach(line => {
                const checkboxMatch = line.match(/\[x\] (.+)/);
                if (checkboxMatch) {
                    const checkboxLabel = checkboxMatch[1];

                    // Check if the checkbox label is in the predefined list
                    if (checkboxLabels.includes(checkboxLabel) && serviceData[0].fields.hasOwnProperty(checkboxLabel)) {
                        serviceData[0].fields[checkboxLabel] = true; // Check the checkbox
                    }
                }
            });
        }
    }
</script>

<style>
    /* You can adjust these styles according to your preferences */
    .section-label {
        font-weight: 600;
        font-size: 0.9em; /* or any other desired font size */
        margin-bottom: 0.5em; /* or adjust the margin as needed */
    }
</style>

<TextInput label="Customer First Name" value={serviceData[0]?.fields["First Name (from Phone Number)"] || ''}/> <br>
<TextInput label="Customer Last Name" value={serviceData[0]?.fields["Last Name (from Phone Number)"] || ''}/> <br>
<TextInput label="Phone Number" value={serviceData[0]?.fields["Phone Number"] || ''}/> <br>
<TextInput label="Bike Information" value={serviceData[0]?.fields["Bike Description"] || ''}/> <br>
<Textarea label="Customer Comments"value={serviceData[0]?.fields["Customer Comments"] || ''}/> <br>
<Textarea label="Technician Comments" value={serviceData[0]?.fields["Technician Comments"] || ''}/> <br>
<TextInput label="Service Status" value={serviceData[0]?.fields["Service Status"] || ''}/> <br>
<div class="section-label">Performed Services</div>
<Accordion multiple=true>
    <Accordion.Item value="tires">
        <div slot="control">Tires</div>
        <Checkbox  label="Front Tire" bind:checked={serviceData[0].fields["Front Tire"]} /> <br>
        <Checkbox  label="Rear Tire" bind:checked={serviceData[0].fields["Rear Tire"]} /> <br>
        <Checkbox  label="Tubes" bind:checked={serviceData[0].fields["Tubes"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="frameandform">
        <div slot="control">Frame and Form</div>
        <Checkbox  label="Headset & Stem" bind:checked={serviceData[0].fields["Headset & Stem"]} /> <br>
        <Checkbox  label="Seatpost/Dropper" bind:checked={serviceData[0].fields["Seatpost/Dropper"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="suspension">
        <div slot="control">Suspension</div>
        <Checkbox  label="Suspension Fork" bind:checked={serviceData[0].fields["Suspension Fork"]} /> <br>
        <Checkbox  label="Rear Shock" bind:checked={serviceData[0].fields["Rear Shock"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="drivetrain">
        <div slot="control">Drive Train</div>
        <Checkbox  label="Chain" bind:checked={serviceData[0].fields["Chain"]} /> <br>
        <Checkbox  label="Cassette" bind:checked={serviceData[0].fields["Cassette"]} /> <br>
        <Checkbox  label="Crank/Chainring" bind:checked={serviceData[0].fields["Crank/Chainring"]} /> <br>
        <Checkbox  label="Cables/Housing" bind:checked={serviceData[0].fields["Cables/Housing"]} /> <br>
        <Checkbox  label="Shifters/Derailleurs" bind:checked={serviceData[0].fields["Shifters/Derailleurs"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="ridercontactpoints">
        <div slot="control">Rider Contact Points</div>
        <Checkbox  label="Pedals" bind:checked={serviceData[0].fields["Pedals"]} /> <br>
        <Checkbox  label="Grips/Tape" bind:checked={serviceData[0].fields["Grips/Tape"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="wheelsystem">
        <div slot="control">Wheel System</div>
        <Checkbox  label="Rims" bind:checked={serviceData[0].fields["Rims"]} /> <br>
        <Checkbox  label="Spokes" bind:checked={serviceData[0].fields["Spokes"]} /> <br>
        <Checkbox  label="Hubs" bind:checked={serviceData[0].fields["Hubs"]} /> <br>
        <Checkbox  label="Skewer/Bolt" bind:checked={serviceData[0].fields["Skewer/Bolt"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="brakingsystem">
        <div slot="control">Braking System</div>
        <Checkbox  label="Capliers" bind:checked={serviceData[0].fields["Capliers"]} /> <br>
        <Checkbox  label="Levers" bind:checked={serviceData[0].fields["Levers"]} /> <br>
        <Checkbox  label="Pads & Rotors /Rim Surface" bind:checked={serviceData[0].fields["Pads & Rotors /Rim Surface"]} /> <br>
        <Checkbox  label="Cables & Housing" bind:checked={serviceData[0].fields["Cables & Housing"]} /> <br>
    </Accordion.Item>
</Accordion> <br>
<TextInput label="Mechanic Completing Tune-Up" value={serviceData[0]?.fields["Assigned Tech"] || ''}/> <br>
<TextInput label="Drop-Off Date" value={serviceData[0]?.fields["Drop-off date"] || ''}/> <br>
<TextInput label="Requested Completion Date" value={serviceData[0]?.fields["Requested completion date"] || ''}/> <br>
<Button ripple>Submit</Button> <br>