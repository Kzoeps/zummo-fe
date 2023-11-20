<script>
    import { SvelteUIProvider, Modal, Button, TextInput, Accordion, Checkbox} from '@svelteuidev/core';
    import { createEventDispatcher } from "svelte";
    import { serviceDataStore } from './dataStore';

    const dispatch = createEventDispatcher();
    const headers = {
        "Content-Type": "application/json"
    }

    let serviceRecordID = ''; //stores user input

    async function openTuneUpModal() {
        dispatch('open-tune-up-modal');
    }

    async function getRecordNumber() {
        // Make a fetch request with user input to get the service record
        fetch("http://127.0.0.1:5000/get-services-by-id", {method: "POST", body: JSON.stringify({"Service Bike ID": serviceRecordID}), headers })
            .then(response => response.json())
            .then(serviceData => {
                // Console log the data to see if it's working and what it fetches
                console.log(serviceData);
                // Update the store with the fetched data
                serviceDataStore.set(serviceData);
                if ($serviceDataStore !== null) {
                    openTuneUpModal();
                }
            });
    }
</script>

<strong>Search for an existing service record using the record number</strong><br><br>

<TextInput label="Service Record" bind:value={serviceRecordID}/> <br>
<Button on:click={getRecordNumber} ripple>Search</Button> <br>