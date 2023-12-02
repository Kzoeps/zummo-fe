<script>
    import { Accordion, Button, Checkbox, TextInput, Textarea } from '@svelteuidev/core';
    import { serviceDataStore } from './dataStore';

    const headers = {
        "Content-Type": "application/json"
    }

    function handleInput(event, field) {
        serviceData[0].fields[field] = event.target.value;
        console.log(serviceData[0].fields[field]);
    }

    let serviceData;
    serviceDataStore.subscribe((value) => {
        serviceData = value;
        // Check if data is defined before calling updateCheckboxes
        if (serviceData) {
            updateCheckboxes();
        }
    });

    let firstName = serviceData[0]?.fields["First Name (from Phone Number)"] || '';
    let lastName = serviceData[0]?.fields["Last Name (from Phone Number)"] || '';
    let phoneNumber = serviceData[0]?.fields["Phone Number"] || '';
    let bikeInformation = serviceData[0]?.fields["Bike Description"] || '';
    let customerComments = serviceData[0]?.fields["Customer Comments"] || '';
    let technicianComments = serviceData[0]?.fields["Technician Comments"] || '';
    let serviceStatus = serviceData[0]?.fields["Service Status"] || '';
    let mechanic = serviceData[0]?.fields["Assigned Tech"] || '';
    let dropOffDate = serviceData[0]?.fields["Drop-off date"] || '';
    let requestedCompletionDate = serviceData[0]?.fields["Requested completion date"] || '';
    let frontTireR = serviceData[0]?.fields["Front Tire R"] || false;
    let frontTire = serviceData[0]?.fields["Front Tire"] || false;
    let rearTireR = serviceData[0]?.fields["Rear Tire R"] || false;
    let rearTire = serviceData[0]?.fields["Rear Tire"] || false;
    let tubesR = serviceData[0]?.fields["Tubes R"] || false;
    let tubes = serviceData[0]?.fields["Tubes"] || false;
    let headsetR = serviceData[0]?.fields["Headset & Stem R"] || false;
    let headset = serviceData[0]?.fields["Headset & Stem"] || false;
    let seatpostR = serviceData[0]?.fields["Seatpost/Dropper R"] || false;
    let seatpost = serviceData[0]?.fields["Seatpost/Dropper"] || false;
    let suspensionForkR = serviceData[0]?.fields["Suspension Fork R"] || false;
    let suspensionFork = serviceData[0]?.fields["Suspension Fork"] || false;
    let rearShockR = serviceData[0]?.fields["Rear Shock R"] || false;
    let rearShock = serviceData[0]?.fields["Rear Shock"] || false;
    let chainR = serviceData[0]?.fields["Chain R"] || false;
    let chain = serviceData[0]?.fields["Chain"] || false;
    let cassetteR = serviceData[0]?.fields["Casette R"] || false;
    let cassette = serviceData[0]?.fields["Cassette"] || false;
    let crankR = serviceData[0]?.fields["Crank/Chainring R"] || false;
    let crank = serviceData[0]?.fields["Crank/Chainring"] || false;
    let cablesR = serviceData[0]?.fields["Cables/Housing R"] || false;
    let cables = serviceData[0]?.fields["Cables/Housing"] || false;
    let shiftersR = serviceData[0]?.fields["Shifters/Derailleurs R"] || false;
    let shifters = serviceData[0]?.fields["Shifters/Derailleurs"] || false;
    let pedalsR = serviceData[0]?.fields["Pedals R"] || false;
    let pedals = serviceData[0]?.fields["Pedals"] || false;
    let gripsR = serviceData[0]?.fields["Grips/Tape R"] || false;
    let grips = serviceData[0]?.fields["Grips/Tape"] || false;
    let rimsR = serviceData[0]?.fields["Rims R"] || false;
    let rims = serviceData[0]?.fields["Rims"] || false;
    let spokesR = serviceData[0]?.fields["Spokes R"] || false;
    let spokes = serviceData[0]?.fields["Spokes"] || false;
    let hubsR = serviceData[0]?.fields["Hubs R"] || false;
    let hubs = serviceData[0]?.fields["Hubs"] || false;
    let skewerR = serviceData[0]?.fields["Skewer/Bolt R"] || false;
    let skewer = serviceData[0]?.fields["Skewer/Bolt"] || false;
    let capliersR = serviceData[0]?.fields["Capliers R"] || false;
    let capliers = serviceData[0]?.fields["Capliers"] || false;
    let leversR = serviceData[0]?.fields["Levers R"] || false;
    let levers = serviceData[0]?.fields["Levers"] || false;
    let padsR = serviceData[0]?.fields["Pads & Rotors /Rim Surface R"] || false;
    let pads = serviceData[0]?.fields["Pads & Rotors /Rim Surface"] || false;
    let housingR = serviceData[0]?.fields["Cables & Housing R"] || false;
    let housing = serviceData[0]?.fields["Cables & Housing"] || false;
    let servicePerformed = serviceData[0]?.fields["Service Performed"] || '### Service Performed\n    [ ] Front Tire\n    [ ] Rear Tire\n    [ ] Tubes\n    [ ] Headset & Stem\n    [ ] Seatpost/Dropper\n    [ ] Suspension Fork\n    [ ] Rear Shock\n    [ ] Chain\n    [ ] Cassette\n    [ ] Crank/Chainring\n    [ ] Cables/Housing\n    [ ] Shifters/Derailleurs\n    [ ] Pedals\n    [ ] Grips/Tape\n    [ ] Rims\n    [ ] Spokes\n    [ ] Hubs\n    [ ] Skewer/Bolt\n    [ ] Capliers\n    [ ] Levers\n    [ ] Pads & Rotors /Rim Surface\n    [ ] Cables & Housing\n\n';
    let serviceRequested = serviceData[0]?.fields["Service Requested"] || '### Service Requested\n    [ ] Front Tire\n    [ ] Rear Tire\n    [ ] Tubes\n    [ ] Headset & Stem\n    [ ] Seatpost/Dropper\n    [ ] Suspension Fork\n    [ ] Rear Shock\n    [ ] Chain\n    [ ] Cassette\n    [ ] Crank/Chainring\n    [ ] Cables/Housing\n    [ ] Shifters/Derailleurs\n    [ ] Pedals\n    [ ] Grips/Tape\n    [ ] Rims\n    [ ] Spokes\n    [ ] Hubs\n    [ ] Skewer/Bolt\n    [ ] Capliers\n    [ ] Levers\n    [ ] Pads & Rotors /Rim Surface\n    [ ] Cables & Housing\n\n';

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

    /**
     * steps to update:
     * 1. know where the data you are trying to send is: In this case all the fields have been binded to serviceData so
     * we are trying to send serviceData
     * 2. JSON.stringify whatever data you are trying to send
     * 3. In the fetch call the options(after the url) should be {method: "POST", body: the_json_stringified_data}
     * 
     */
    async function updateAirtable() {
        /*serviceData[0].fields["First Name (from Phone Number)"] = firstName;
        serviceData[0].fields["Last Name (from Phone Number)"] = lastName;
        serviceData[0].fields["Phone Number"] = phoneNumber;
        serviceData[0].fields["Bike Description"] = bikeInformation;
        serviceData[0].fields["Customer Comments"] = customerComments;
        serviceData[0].fields["Technician Comments"] = technicianComments;
        serviceData[0].fields["Service Status"] = serviceStatus;
        serviceData[0].fields["Assigned Tech"] = mechanic;
        serviceData[0].fields["Drop-off date"] = dropOffDate;
        serviceData[0].fields["Requested completion date"] = requestedCompletionDate;*/
        serviceData[0].fields["Front Tire R"] = frontTireR;
        serviceData[0].fields["Front Tire"] = frontTire;
        serviceData[0].fields["Rear Tire R"] = rearTireR;
        serviceData[0].fields["Rear Tire"] = rearTire;
        serviceData[0].fields["Tubes R"] = tubesR;
        serviceData[0].fields["Tubes"] = tubes;
        serviceData[0].fields["Headset & Stem R"] = headsetR;
        serviceData[0].fields["Headset & Stem"] = headset;
        serviceData[0].fields["Seatpost/Dropper R"] = seatpostR;
        serviceData[0].fields["Seatpost/Dropper"] = seatpost;
        serviceData[0].fields["Suspension Fork R"] = suspensionForkR;
        serviceData[0].fields["Suspension Fork"] = suspensionFork;
        serviceData[0].fields["Rear Shock R"] = rearShockR;
        serviceData[0].fields["Rear Shock"] = rearShock;
        serviceData[0].fields["Chain R"] = chainR;
        serviceData[0].fields["Chain"] = chain;
        serviceData[0].fields["Casette R"] = cassetteR;
        serviceData[0].fields["Casette"] = cassette;
        serviceData[0].fields["Crank/Chainring R"] = crankR;
        serviceData[0].fields["Crank/Chainring"] = crank;
        serviceData[0].fields["Cables/Housing R"] = cablesR;
        serviceData[0].fields["Cables/Housing"] = cables;
        serviceData[0].fields["Shifters/Derailleurs R"] = shiftersR;
        serviceData[0].fields["Shifters/Derailleurs"] = shifters;
        serviceData[0].fields["Pedals R"] = pedalsR;
        serviceData[0].fields["Pedals"] = pedals;
        serviceData[0].fields["Grips/Tape R"] = gripsR;
        serviceData[0].fields["Grips/Tape"] = grips;
        serviceData[0].fields["Rims R"] = rimsR;
        serviceData[0].fields["Rims"] = rims;
        serviceData[0].fields["Spokes R"] = spokesR;
        serviceData[0].fields["Spokes"] = spokes;
        serviceData[0].fields["Hubs R"] = hubsR;
        serviceData[0].fields["Hubs"] = hubs;
        serviceData[0].fields["Skewer/Bolt R"] = skewerR;
        serviceData[0].fields["Skewer/Bolt"] = skewer;
        serviceData[0].fields["Capliers R"] = capliersR;
        serviceData[0].fields["Capliers"] = capliers;
        serviceData[0].fields["Levers R"] = leversR;
        serviceData[0].fields["Levers"] = levers;
        serviceData[0].fields["Pads & Rotors /Rim Surface R"] = padsR;
        serviceData[0].fields["Pads & Rotors /Rim Surface"] = pads;
        serviceData[0].fields["Cables & Housing R"] = housingR;
        serviceData[0].fields["Cables & Housing"] = housing;

        // Generate checkbox strings
        serviceData[0].fields["Service Performed"] = generatePerformedCheckboxString(serviceData[0]);
        serviceData[0].fields["Service Requested"] = generateRequestedCheckboxString(serviceData[0]);
        
        console.log(serviceData[0].fields["Service Performed"]);

        function generatePerformedCheckboxString(data) {
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
                    const checked = data.fields[label] ?? false;
                    const checkboxChecked = checked ? "[x]" : "[ ]";
                    return `    ${checkboxChecked} ${label}`;
                });
                return `### ${index + 1}. ${currentCategory}\n${categoryLines.join('\n')}`;
            });
            return `${lines.join('\n')}\n\n`;
        }

        function generateRequestedCheckboxString(data) {
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
                    const checked = data.fields[`${label} R`] ?? false;
                    const checkboxChecked = checked ? "[x]" : "[ ]";
                    return `    ${checkboxChecked} ${label}`;
                });
                return `### ${index + 1}. ${currentCategory}\n${categoryLines.join('\n')}`;
            });
            return `${lines.join('\n')}\n\n`;
        }

        // Make a fetch request with user input to get the service record
        const serviceDataJson = JSON.stringify(serviceData);
        fetch("http://127.0.0.1:5000/edit-db", {method: "POST", body: serviceDataJson, headers })
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

    .indented-checkbox {
        margin-left: 20px; /* Adjust the left margin to control the indentation */
    }
</style>

<TextInput label="Customer First Name" value={firstName} on:input={(event) => handleInput(event, "First Name (from Phone Number)")}/> <br>
<TextInput label="Customer Last Name" value={lastName} on:input={(event) => handleInput(event, "Last Name (from Phone Number)")}/> <br>
<TextInput label="Phone Number" value={phoneNumber} on:input={(event) => handleInput(event, "Phone Number")}/> <br>
<TextInput label="Bike Information" value={bikeInformation} on:input={(event) => handleInput(event, "Bike Description")}/> <br>
<Textarea label="Customer Comments"value={customerComments} on:input={(event) => handleInput(event, "Customer Comments")}/> <br>
<Textarea label="Technician Comments" value={technicianComments} on:input={(event) => handleInput(event, "Technician Comments")}/> <br>
<TextInput label="Service Status" value={serviceStatus} on:input={(event) => handleInput(event, "Service Status")}/> <br>
<div class="section-label">Requested Services</div>
<Accordion multiple=true>
    <Accordion.Item value="tires">
        <div slot="control">Tires</div>
        <Checkbox  label="Front Tire" bind:checked={frontTireR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={frontTire} /></div> <br>
        <Checkbox  label="Rear Tire" bind:checked={rearTireR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={rearTire} /></div> <br>
        <Checkbox  label="Tubes" bind:checked={tubesR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={tubes} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="frameandform">
        <div slot="control">Frame and Form</div>
        <Checkbox  label="Headset & Stem" bind:checked={headsetR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={headset} /></div> <br>
        <Checkbox  label="Seatpost/Dropper" bind:checked={seatpostR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={seatpost} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="suspension">
        <div slot="control">Suspension</div>
        <Checkbox  label="Suspension Fork" bind:checked={suspensionForkR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={suspensionFork} /></div> <br>
        <Checkbox  label="Rear Shock" bind:checked={rearShockR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={rearShock} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="drivetrain">
        <div slot="control">Drive Train</div>
        <Checkbox  label="Chain" bind:checked={chainR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={chain} /></div> <br>
        <Checkbox  label="Cassette" bind:checked={cassetteR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={cassette} /></div> <br>
        <Checkbox  label="Crank/Chainring" bind:checked={crankR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={crank} /></div> <br>
        <Checkbox  label="Cables/Housing" bind:checked={cablesR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={cables} /></div> <br>
        <Checkbox  label="Shifters/Derailleurs" bind:checked={shiftersR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={shifters} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="ridercontactpoints">
        <div slot="control">Rider Contact Points</div>
        <Checkbox  label="Pedals" bind:checked={pedalsR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={pedals} /></div> <br>
        <Checkbox  label="Grips/Tape" bind:checked={gripsR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={grips} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="wheelsystem">
        <div slot="control">Wheel System</div>
        <Checkbox  label="Rims" bind:checked={rimsR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={rims} /></div> <br>
        <Checkbox  label="Spokes" bind:checked={spokesR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={spokes} /></div> <br>
        <Checkbox  label="Hubs" bind:checked={hubsR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={hubs} /></div> <br>
        <Checkbox  label="Skewer/Bolt" bind:checked={skewerR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={skewer} /></div> <br>
    </Accordion.Item>
    <Accordion.Item value="brakingsystem">
        <div slot="control">Braking System</div>
        <Checkbox  label="Capliers" bind:checked={capliersR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={capliers} /></div> <br>
        <Checkbox  label="Levers" bind:checked={leversR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={levers} /></div> <br>
        <Checkbox  label="Pads & Rotors /Rim Surface" bind:checked={padsR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={pads} /></div> <br>
        <Checkbox  label="Cables & Housing" bind:checked={housingR} /> <br>
        <div class="indented-checkbox"><Checkbox label="Performed" size="sm" bind:checked={housing} /></div> <br>
    </Accordion.Item>
</Accordion> <br>
<TextInput label="Mechanic Completing Tune-Up" value={mechanic} on:input={(event) => handleInput(event, "Assigned Tech")}/> <br>
<TextInput label="Drop-Off Date" value={dropOffDate} on:input={(event) => handleInput(event, "Drop-off Date")}/> <br>
<TextInput label="Requested Completion Date" value={requestedCompletionDate} on:input={(event) => handleInput(event, "Requested Completion Date")}/> <br>
<Button on:click={updateAirtable} ripple>Submit</Button> <br>