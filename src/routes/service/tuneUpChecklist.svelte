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

            // Create a new object to store updated checkbox values
            const updatedFields = { ...serviceData[0].fields,
                "Front Tire":false, "Rear Tire":false, "Tubes":false,
                "Headset & Stem":false, "Seatpost/Dropper":false,
                "Suspension Fork":false, "Rear Shock":false,
                "Chain":false, "Cassette":false, "Crank/Chainring":false, "Cables/Housing":false, "Shifters/Derailleurs":false,
                "Pedals":false, "Grips/Tape":false,
                "Rims":false, "Spokes":false, "Hubs":false, "Skewer/Bolt":false,
                "Capliers":false, "Levers":false, "Pads & Rotors /Rim Surface":false, "Cables & Housing":false
            };

            // Iterate through the lines
            lines.forEach(line => {
                const checkboxMatch = line.match(/\[x\] (.+)/);
                if (checkboxMatch) {
                    const checkboxLabel = checkboxMatch[1].trim();
                    console.log(`Found checkbox: ${checkboxLabel}`); // Log found checkbox
                    // Check if the checkbox label is in the predefined list
                    if (checkboxLabels.includes(checkboxLabel) && updatedFields.hasOwnProperty(checkboxLabel)) {
                        console.log(`Checking checkbox: ${checkboxLabel}`);
                        updatedFields[checkboxLabel] = true; // Check the checkbox
                    } else {
                        console.log(`Checkbox not found in predefined list: ${checkboxLabel}`);
                    }
                }
            });
            // Update serviceData[0].fields with the new object
            serviceData = [{ ...serviceData[0], fields: updatedFields }];
        }

        //Check if there is defined data
        if (serviceData[0]?.fields['Service Requested']) {
            // Get the "Service Requested" text from the data
            const serviceRequestedText = serviceData[0].fields["Service Requested"];

            // Split the text into lines
            const lines = serviceRequestedText.split('\n');

            // Define checkbox labels here to bind them later
            const checkboxLabels = [
                "Front Tire R", "Rear Tire R", "Tubes R",
                "Headset & Stem R", "Seatpost/Dropper R",
                "Suspension Fork R", "Rear Shock R",
                "Chain R", "Cassette R", "Crank/Chainring R", "Cables/Housing R", "Shifters/Derailleurs R",
                "Pedals R", "Grips/Tape R",
                "Rims R", "Spokes R", "Hubs R", "Skewer/Bolt R",
                "Capliers R", "Levers R", "Pads & Rotors /Rim Surface R", "Cables & Housing R"
            ];

            // Create a new object to store updated checkbox values
            const updatedFields = { ...serviceData[0].fields,
                "Front Tire R":false, "Rear Tire R":false, "Tubes R":false,
                "Headset & Stem R":false, "Seatpost/Dropper R":false,
                "Suspension Fork R":false, "Rear Shock R":false,
                "Chain R":false, "Cassette R":false, "Crank/Chainring R":false, "Cables/Housing R":false, "Shifters/Derailleurs R":false,
                "Pedals R":false, "Grips/Tape R":false,
                "Rims R":false, "Spokes R":false, "Hubs R":false, "Skewer/Bolt R":false,
                "Capliers R":false, "Levers R":false, "Pads & Rotors /Rim Surface R":false, "Cables & Housing R":false
            };

            // Iterate through the lines
            lines.forEach(line => {
                const checkboxMatch = line.match(/\[x\] (.+)/);
                if (checkboxMatch) {
                    const checkboxLabel = checkboxMatch[1].trim();
                    const checkLabelR = `${checkboxLabel} R`;
                    console.log(checkLabelR);
                    console.log(`Found checkbox: ${checkboxLabel}`); // Log found checkbox
                    // Check if the checkbox label is in the predefined list
                    if (checkboxLabels.includes(checkLabelR) && updatedFields.hasOwnProperty(checkLabelR)) {
                        console.log(`Checking checkbox: ${checkboxLabel}`);
                        updatedFields[checkLabelR] = true; // Check the checkbox
                    } else {
                        console.log(`Checkbox not found in predefined list: ${checkboxLabel}`);
                    }
                }
            });
            // Update serviceData[0].fields with the new object
            serviceData = [{ ...serviceData[0], fields: updatedFields }];
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

    .indented-checkbox {
        margin-left: 20px; /* Adjust the left margin to control the indentation */
    }
</style>

<TextInput label="Customer First Name" value={serviceData[0]?.fields["First Name (from Phone Number)"] || ''}/> <br>
<TextInput label="Customer Last Name" value={serviceData[0]?.fields["Last Name (from Phone Number)"] || ''}/> <br>
<TextInput label="Phone Number" value={serviceData[0]?.fields["Phone Number"] || ''}/> <br>
<TextInput label="Bike Information" value={serviceData[0]?.fields["Bike Description"] || ''}/> <br>
<Textarea label="Customer Comments"value={serviceData[0]?.fields["Customer Comments"] || ''}/> <br>
<Textarea label="Technician Comments" value={serviceData[0]?.fields["Technician Comments"] || ''}/> <br>
<TextInput label="Service Status" value={serviceData[0]?.fields["Service Status"] || ''}/> <br>
<div class="section-label">Requested Services</div>
<Accordion multiple=true>
    <Accordion.Item value="tires">
        <div slot="control">Tires</div>
        <Checkbox  label="Front Tire" bind:checked={serviceData[0].fields["Front Tire R"]} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={serviceData[0].fields["Front Tire"]} /></div> <br>
        <Checkbox  label="Rear Tire" bind:checked={serviceData[0].fields["Rear Tire R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Rear Tire"]} /></div> <br>
        <Checkbox  label="Tubes" bind:checked={serviceData[0].fields["Tubes R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Performed"]} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="frameandform">
        <div slot="control">Frame and Form</div>
        <Checkbox  label="Headset & Stem" bind:checked={serviceData[0].fields["Headset & Stem R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Headset & Stem"]} /></div> <br>
        <Checkbox  label="Seatpost/Dropper" bind:checked={serviceData[0].fields["Seatpost/Dropper R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Seatpost/Dropper"]} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="suspension">
        <div slot="control">Suspension</div>
        <Checkbox  label="Suspension Fork" bind:checked={serviceData[0].fields["Suspension Fork R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Suspension Fork"]} /></div> <br>
        <Checkbox  label="Rear Shock" bind:checked={serviceData[0].fields["Rear Shock R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Rear Shock"]} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="drivetrain">
        <div slot="control">Drive Train</div>
        <Checkbox  label="Chain" bind:checked={serviceData[0].fields["Chain R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Chain"]} /></div> <br>
        <Checkbox  label="Cassette" bind:checked={serviceData[0].fields["Cassette R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Cassette"]} /></div> <br>
        <Checkbox  label="Crank/Chainring" bind:checked={serviceData[0].fields["Crank/Chainring R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Crank/Chainring"]} /></div> <br>
        <Checkbox  label="Cables/Housing" bind:checked={serviceData[0].fields["Cables/Housing R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Cables/Housing"]} /></div> <br>
        <Checkbox  label="Shifters/Derailleurs" bind:checked={serviceData[0].fields["Shifters/Derailleurs R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Shifters/Derailleurs"]} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="ridercontactpoints">
        <div slot="control">Rider Contact Points</div>
        <Checkbox  label="Pedals" bind:checked={serviceData[0].fields["Pedals R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Pedals"]} /></div> <br>
        <Checkbox  label="Grips/Tape" bind:checked={serviceData[0].fields["Grips/Tape R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Grips/Tape"]} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="wheelsystem">
        <div slot="control">Wheel System</div>
        <Checkbox  label="Rims" bind:checked={serviceData[0].fields["Rims R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Rims"]} /></div> <br>
        <Checkbox  label="Spokes" bind:checked={serviceData[0].fields["Spokes R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Spokes"]} /></div> <br>
        <Checkbox  label="Hubs" bind:checked={serviceData[0].fields["Hubs R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Hubs"]} /></div> <br>
        <Checkbox  label="Skewer/Bolt" bind:checked={serviceData[0].fields["Skewer/Bolt R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Skewer/Bolt"]} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="brakingsystem">
        <div slot="control">Braking System</div>
        <Checkbox  label="Capliers" bind:checked={serviceData[0].fields["Capliers R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Capliers"]} /></div> <br>
        <Checkbox  label="Levers" bind:checked={serviceData[0].fields["Levers R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Levers"]} /></div> <br>
        <Checkbox  label="Pads & Rotors /Rim Surface" bind:checked={serviceData[0].fields["Pads & Rotors /Rim Surface R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Pads & Rotors /Rim Surface"]} /></div> <br>
        <Checkbox  label="Cables & Housing" bind:checked={serviceData[0].fields["Cables & Housing R"]} /> <br>
        <div class="indented-checkbox"><Checkbox  class="indented-checkbox" label="Performed" size="sm" bind:checked={serviceData[0].fields["Cables & Housing"]} /></div> <br>
    </Accordion.Item>
</Accordion> <br>
<TextInput label="Mechanic Completing Tune-Up" value={serviceData[0]?.fields["Assigned Tech"] || ''}/> <br>
<TextInput label="Drop-Off Date" value={serviceData[0]?.fields["Drop-off date"] || ''}/> <br>
<TextInput label="Requested Completion Date" value={serviceData[0]?.fields["Requested completion date"] || ''}/> <br>
<Button ripple>Submit</Button> <br>