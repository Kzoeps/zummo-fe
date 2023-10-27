<script>
    import { SvelteUIProvider, Modal, Button, TextInput, Accordion, Checkbox} from '@svelteuidev/core';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function openTuneUpModal() {
        dispatch('open-tune-up-modal');
    }

    async function getRecordNumber() {
        fetch("./get-services-by-id")
        
    }
</script>

<strong>Search for an existing service record using the record number</strong><br><br>

<TextInput label="Service Record"/> <br>
<Button on:click={getRecordNumber()} ripple>Search</Button> <br>