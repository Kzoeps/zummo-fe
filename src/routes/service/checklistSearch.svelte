<script>
    import { SvelteUIProvider, Modal, Button, TextInput, Accordion, Checkbox} from '@svelteuidev/core';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const headers = {
        "Content-Type": "application/json"
    }

    let serviceRecordID = ''; //stores user input

    async function openTuneUpModal() {
        dispatch('open-tune-up-modal');
    }

    async function getRecordNumber() {
        // Make a fetch request with user input
        fetch("http://127.0.0.1:5000/get-services-by-id", {method: "POST", body: JSON.stringify({"Service Bike ID": serviceRecordID}), headers })
            .then(response => response.json())
            .then(data => {
                // Handle the response data as needed
                console.log(data);
            });
    }
</script>

<strong>Search for an existing service record using the record number</strong><br><br>

<TextInput label="Service Record" bind:value={serviceRecordID}/> <br>
<Button on:click={getRecordNumber} ripple>Search</Button> <br>