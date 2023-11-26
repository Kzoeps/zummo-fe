<script>
    import { SvelteUIProvider, Textarea, Modal, Button, TextInput, Accordion, Checkbox} from '@svelteuidev/core';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { get } from 'svelte/store';

    let formData = writable({
        // Initialize formData with default or empty values
        "Customer First Name": "",
        "Customer Last Name": "",
        "Phone Number": "",
        "Bike Information": "",
        "Customer Comments": "",
        "Technician Comments": "",
        "Service Status": "",
        "Requested Services": "",
        "Requested Services Nested": {
            "Tires": {
                "Front Tire": false,
                "Rear Tire": false,
                "Tubes": false,
            },
            "Frame and Form": {
                "Headset & Stem": false,
                "Seatpost/Dropper": false,
            },
            "Suspension": {
                "Suspension Fork": false,
                "Rear Shock": false,
            },
            "Drive Train": {
                "Chain": false,
                "Cassette": false,
                "Crank/Chainring": false,
                "Cables/Housing": false,
                "Shifters/Derailleurs": false,
            },
            "Rider Contact Points": {
                "Pedals": false,
                "Grips/Tape": false,
            },
            "Wheel System": {
                "Rims": false,
                "Spokes": false,
                "Hubs": false,
                "Skewer/Bolt": false,
            },
            "Braking System": {
                "Capliers": false,
                "Levers": false,
                "Pads & Rotors /Rim Surface": false,
                "Cables & Housing": false,
            },
        },
        "Mechanic Completing Tune-Up": "",
        "Drop-off Date": "",
        "Requested Completion Date": "",
    });

    // Initialize newFormData with the current values from formData
    let newFormData = writable({
        "Customer First Name": $formData["Customer First Name"],
        "Customer Last Name": $formData["Customer Last Name"],
        "Phone Number": $formData["Phone Number"],
        "Bike Information": $formData["Bike Information"],
        "Customer Comments": $formData["Customer Comments"],
        "Technician Comments": $formData["Technician Comments"],
        "Service Status": $formData["Service Status"],
        "Requested Services": $formData["Requested Services"],
        "Mechanic Completing Tune-Up": $formData["Mechanic Completing Tune-Up"],
        "Drop-off Date": $formData["Drop-off Date"],
        "Requested Completion Date": $formData["Requested Completion Date"],
    });

    // Function to handle form submission
    async function submitFormData() {
        try {
            formData.update(currentFormData => ({
                ...currentFormData,
                "Customer First Name": currentFormData["Customer First Name"],
                "Customer Last Name": currentFormData["Customer Last Name"],
                "Phone Number": currentFormData["Phone Number"],
                "Bike Information": currentFormData["Bike Information"],
                "Customer Comments": currentFormData["Customer Comments"],
                "Technician Comments": currentFormData["Technician Comments"],
                "Service Status": currentFormData["Service Status"],
                "Mechanic Completing Tune-Up": currentFormData["Mechanic Completing Tune-Up"],
                "Drop-off Date": currentFormData["Drop-off Date"],
                "Requested Completion Date": currentFormData["Requested Completion Date"],
            }));

            // Process the "Requested Services" object into a string
            const requestedServicesString = Object.entries($formData["Requested Services Nested"]).map(([serviceCategory, services], index) => {
                const serviceCategoryString = `### ${index + 1}. ${serviceCategory}\n`;

                const servicesString = Object.entries(services).map(([service, checked]) => {
                    const checkbox = checked ? "[x]" : "[ ]";
                    return `    ${checkbox} ${service}\n`;
                }).join('');

                return `${serviceCategoryString}${servicesString}`;
            }).join('');

            // Update formData with the generated string for "Requested Services"
            formData.update(currentFormData => ({
                ...currentFormData,
                "Requested Services": requestedServicesString,
            }));

            const dataToSend = {
                fields_and_values: get(newFormData)
            };

            // Log the data to send for testing (you can remove this line in the final version)
            console.log("Data to Send: ", dataToSend);

            const response = await fetch("http://127.0.0.1:5000/add-to-db", {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Add to DB Response: ", result);
                // Handle success as needed
            } else {
                console.error("Error adding data to Airtable:", response.statusText);
            }

        } catch (error) {
            console.error("Error during data submission:", error);
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

<TextInput bind:value={$formData["Customer First Name"]} label="Customer First Name"/> <br>
<TextInput bind:value={$formData["Customer Last Name"]} label="Customer Last Name"/> <br>
<TextInput bind:value={$formData["Phone Number"]} label="Phone Number"/> <br>
<TextInput bind:value={$formData["Bike Information"]} label="Bike Information"/> <br>
<Textarea bind:value={$formData["Customer Comments"]} label="Customer Comments"/> <br>
<Textarea bind:value={$formData["Technician Comments"]} label="Technician Comments"/> <br>
<TextInput bind:value={$formData["Service Status"]} label="Service Status"/> <br>
<div class="section-label">Requested Services</div>
<Accordion multiple=true>
    <Accordion.Item value="tires">
        <div slot="control">Tires</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Tires"]["Front Tire"]} label="Front Tire" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Tires"]["Rear Tire"]} label="Rear Tire" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Tires"]["Tubes"]} label="Tubes" /> <br>
    </Accordion.Item>
    <Accordion.Item value="frameandform">
        <div slot="control">Frame and Form</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Frame and Form"]["Headset & Stem"]} label="Headset & Stem" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Frame and Form"]["Seatpost/Dropper"]} label="Seatpost/Dropper" /> <br>
    </Accordion.Item>
    <Accordion.Item value="suspension">
        <div slot="control">Suspension</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Suspension"]["Suspension Fork"]} label="Suspension Fork" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Suspension"]["Rear Shock"]} label="Rear Shock" /> <br>
    </Accordion.Item>
    <Accordion.Item value="drivetrain">
        <div slot="control">Drive Train</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Drive Train"]["Chain"]} label="Chain" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Drive Train"]["Cassette"]} label="Cassette" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Drive Train"]["Crank/Chainring"]} label="Crank/Chainring" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Drive Train"]["Cables/Housing"]} label="Cables/Housing" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Drive Train"]["Shifters/Derailleurs"]} label="Shifters/Derailleurs" /> <br>
    </Accordion.Item>
    <Accordion.Item value="ridercontactpoints">
        <div slot="control">Rider Contact Points</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Rider Contact Points"]["Pedals"]} label="Pedals" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Rider Contact Points"]["Grips/Tape"]} label="Grips/Tape" /> <br>
    </Accordion.Item>
    <Accordion.Item value="wheelsystem">
        <div slot="control">Wheel System</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Wheel System"]["Rims"]} label="Rims" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Wheel System"]["Spokes"]} label="Spokes" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Wheel System"]["Hubs"]} label="Hubs"/> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Wheel System"]["Skewer/Bolt"]} label="Skewer/Bolt" /> <br>
    </Accordion.Item>
    <Accordion.Item value="brakingsystem">
        <div slot="control">Braking System</div>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Braking System"]["Capliers"]} label="Capliers" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Braking System"]["Levers"]} label="Levers" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Braking System"]["Pads & Rotors /Rim Surface"]} label="Pads & Rotors /Rim Surface" /> <br>
        <Checkbox bind:checked={$formData["Requested Services Nested"]["Braking System"]["Cables & Housing"]} label="Cables & Housing" /> <br>
    </Accordion.Item>
</Accordion> <br>
<TextInput bind:value={$formData["Mechanic Completing Tune-Up"]} label="Mechanic Completing Tune-Up" /> <br>
<TextInput bind:value={$formData["Drop-off Date"]} label="Drop-off Date" /> <br>
<TextInput bind:value={$formData["Requested Completion Date"]} label="Requested Completion Date" /> <br>
<Button on:click={submitFormData} ripple>Submit</Button> <br>