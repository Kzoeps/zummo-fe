<script>
    import { Accordion, Button, Checkbox, TextInput, Textarea } from '@svelteuidev/core';

    // Define headers for the fetch request
    const headers = {
        "Content-Type": "application/json"
    };

    let formData = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        bikeInformation: '',
        customerComments: '',
        technicianComments: '',
        serviceStatus: '',
        mechanic: '',
        dropOffDate: '',
        requestedCompletionDate: '',
        frontTireR: false,
        rearTireR: false,
        tubesR: false,
        headsetR: false,
        seatpostR: false,
        suspensionForkR: false,
        rearShockR: false,
        chainR: false,
        cassetteR: false,
        crankR: false,
        cablesR: false,
        shiftersR: false,
        pedalsR: false,
        gripsR: false,
        rimsR: false,
        spokesR: false,
        hubsR: false,
        skewerR: false,
        capliersR: false,
        leversR: false,
        padsR: false,
        housingR: false,
        serviceRequested: '### Service Requested\n    [ ] Front Tire\n    [ ] Rear Tire\n    [ ] Tubes\n    [ ] Headset & Stem\n    [ ] Seatpost/Dropper\n    [ ] Suspension Fork\n    [ ] Rear Shock\n    [ ] Chain\n    [ ] Cassette\n    [ ] Crank/Chainring\n    [ ] Cables/Housing\n    [ ] Shifters/Derailleurs\n    [ ] Pedals\n    [ ] Grips/Tape\n    [ ] Rims\n    [ ] Spokes\n    [ ] Hubs\n    [ ] Skewer/Bolt\n    [ ] Capliers\n    [ ] Levers\n    [ ] Pads & Rotors /Rim Surface\n    [ ] Cables & Housing\n\n'
    }

    // Function to handle input changes
    function handleInput(event, field) {
        formData = { ...formData, [field]: event.target.value };
        console.log(formData[field]);
    }

    // Function to handle form submission
    async function submitForm() {
        // Prepare data object with user inputs
        /*formData = {
            "First Name (from Phone Number)": firstName,
            "Last Name (from Phone Number)": lastName,
            "Phone Number": phoneNumber,
            "Bike Description": bikeInformation,
            "Customer Comments": customerComments,
            "Technician Comments": technicianComments,
            "Service Status": serviceStatus,
            "Assigned Tech": mechanic,
            "Drop-off Date": dropOffDate,
            "Requested Completion Date": requestedCompletionDate,
            "Front Tire R": frontTireR,
            "Rear Tire R": rearTireR,
            "Tubes R": tubesR,
            "Headset & Stem R": headsetR,
            "Seatpost/Dropper R": seatpostR,
            "Suspension Fork R": suspensionForkR,
            "Rear Shock R": rearShockR,
            "Chain R": chainR,
            "Cassette R": cassetteR,
            "Crank/Chainring R": crankR,
            "Cables/Housing R": cablesR,
            "Shifters/Derailleurs R": shiftersR,
            "Pedals R": pedalsR,
            "Grips/Tape R": gripsR,
            "Rims R": rimsR,
            "Spokes R": spokesR,
            "Hubs R": hubsR,
            "Skewer/Bolt R": skewerR,
            "Capliers R": capliersR,
            "Levers R": leversR,
            "Pads & Rotors /Rim Surface R": padsR,
            "Cables & Housing R": housingR,
            "Service Requested": serviceRequested
        };*/

        // Add the generated checkbox string to formData
        formData["Service Requested"] = generateRequestedCheckboxString();
        console.log(formData);

        // Function to generate the checkbox string based on the current state
        function generateRequestedCheckboxString() {
            const checkboxLabelsByCategory = {
                "Tires": ["Front Tire", "Rear Tire", "Tubes"],
                "Frame and Form": ["Headset & Stem", "Seatpost/Dropper"],
                "Suspension": ["Suspension Fork", "Rear Shock"],
                "Drive Train": ["Chain", "Cassette", "Crank/Chainring", "Cables/Housing", "Shifters/Derailleurs"],
                "Rider Contact Points": ["Pedals", "Grips/Tape"],
                "Wheel System": ["Rims", "Spokes", "Hubs", "Skewer/Bolt"],
                "Braking System": ["Capliers", "Levers", "Pads & Rotors /Rim Surface", "Cables & Housing"]
            };

            const lines = Object.entries(checkboxLabelsByCategory).map(([currentCategory, labels], index) => {
                const categoryLines = labels.map(label => {
                    const checked = formData[`${label} R`] ?? false;
                    const checkboxChecked = checked ? "[x]" : "[ ]";
                    return `    ${checkboxChecked} ${label}`;
                });
                return `### ${index + 1}. ${currentCategory}\n${categoryLines.join('\n')}`;
            });
            return `${lines.join('\n')}\n\n`;
        }

        // Make a fetch request with user input to get the service record
        const formDataJson = JSON.stringify(formData);
        fetch("http://127.0.0.1:5000/add-to-db", {method: "POST", body: formDataJson, headers })
            .then(response => response.json())
            .then(serviceData => {
                // Update the store with the fetched data
                //serviceDataStore.set(serviceData);
                //if ($serviceDataStore !== null) {
                //    openTuneUpModal();
                //}
            });
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

<TextInput label="Customer First Name" value={formData.firstName} on:input={(event) => handleInput(event, "firstName")}/> <br>
<TextInput label="Customer Last Name" value={formData.lastName} on:input={(event) => handleInput(event, "lastName")}/> <br>
<TextInput label="Phone Number" value={formData.phoneNumber} on:input={(event) => handleInput(event, "phoneNumber")}/> <br>
<TextInput label="Bike Information" value={formData.bikeInformation} on:input={(event) => handleInput(event, "bikeInformation")}/> <br>
<Textarea label="Customer Comments"value={formData.customerComments} on:input={(event) => handleInput(event, "customerComments")}/> <br>
<Textarea label="Technician Comments" value={formData.technicianComments} on:input={(event) => handleInput(event, "technicianComments")}/> <br>
<TextInput label="Service Status" value={formData.serviceStatus} on:input={(event) => handleInput(event, "serviceStatus")}/> <br>
<div class="section-label">Requested Services</div>
<Accordion multiple=true>
    <Accordion.Item value="tires">
        <div slot="control">Tires</div>
        <Checkbox label="Front Tire" bind:checked={formData["Front Tire R"]}  /> <br>
        <Checkbox label="Rear Tire" bind:checked={formData["Rear Tire R"]} /> <br>
        <Checkbox label="Tubes" bind:checked={formData["Tubes R"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="frameandform">
        <div slot="control">Frame and Form</div>
        <Checkbox label="Headset & Stem" bind:checked={formData["Headset & Stem R"]} /> <br>
        <Checkbox  label="Seatpost/Dropper" bind:checked={formData["Seatpost/Dropper R"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="suspension">
        <div slot="control">Suspension</div>
        <Checkbox  label="Suspension Fork" bind:checked={formData["Suspension Fork R"]} /> <br>
        <Checkbox  label="Rear Shock" bind:checked={formData["Rear Shock R"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="drivetrain">
        <div slot="control">Drive Train</div>
        <Checkbox  label="Chain" bind:checked={formData["Chain R"]} /> <br>
        <Checkbox  label="Cassette" bind:checked={formData["Cassette R"]} /> <br>
        <Checkbox  label="Crank/Chainring" bind:checked={formData["Crank/Chainring R"]} /> <br>
        <Checkbox  label="Cables/Housing" bind:checked={formData["Cables/Housing R"]} /> <br>
        <Checkbox  label="Shifters/Derailleurs" bind:checked={formData["Shifters/Derailleurs R"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="ridercontactpoints">
        <div slot="control">Rider Contact Points</div>
        <Checkbox  label="Pedals" bind:checked={formData["Pedals R"]} /> <br>
        <Checkbox  label="Grips/Tape" bind:checked={formData["Grips/Tape R"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="wheelsystem">
        <div slot="control">Wheel System</div>
        <Checkbox  label="Rims" bind:checked={formData["Rims R"]} /> <br>
        <Checkbox  label="Spokes" bind:checked={formData["Spokes R"]} /> <br>
        <Checkbox  label="Hubs" bind:checked={formData["Hubs R"]} /> <br>
        <Checkbox  label="Skewer/Bolt" bind:checked={formData["Skewer/Bolt R"]} /> <br>
    </Accordion.Item>
    <Accordion.Item value="brakingsystem">
        <div slot="control">Braking System</div>
        <Checkbox  label="Capliers" bind:checked={formData["Capliers R"]} /> <br>
        <Checkbox  label="Levers" bind:checked={formData["Levers R"]} /> <br>
        <Checkbox  label="Pads & Rotors /Rim Surface" bind:checked={formData["Pads & Rotors /Rim Surface R"]} /> <br>
        <Checkbox  label="Cables & Housing" bind:checked={formData["Cables & Housing R"]} /> <br>
    </Accordion.Item>
</Accordion> <br>
<TextInput label="Mechanic Completing Tune-Up" value={formData.mechanic} on:input={(event) => handleInput(event, "mechanic")}/> <br>
<TextInput label="Drop-Off Date" value={formData.dropOffDate} on:input={(event) => handleInput(event, "dropOffDate")}/> <br>
<TextInput label="Requested Completion Date" value={formData.requestedCompletionDate} on:input={(event) => handleInput(event, "requestedCompletionDate")}/> <br>
<Button on:click={submitForm} ripple>Submit</Button> <br>