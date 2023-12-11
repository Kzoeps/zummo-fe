<script>
    import { Button } from '@svelteuidev/core';
    import searchComponent from "./checklistSearch.svelte";
    import createComponent from "./createChecklist.svelte";
    import tuneUpComponent from "./tuneUpChecklist.svelte";
    import processedComponent from "./processed.svelte";

	let showModal = false;
    let selectedComponent = searchComponent;

    function switchComponent(component) {
        selectedComponent = component;
    }

    function handleOpenTuneUpModal() {
        switchComponent(tuneUpComponent);
    }

    function handleOpenCreateModal() {
        switchComponent(createComponent);
    }

    function handleOpenProcessedModal() {
        switchComponent(processedComponent);
    }
</script>

<svelte:head>
    <title>Service</title>
    <meta name="Bike Service" content="View bike status or add bikes in need of servicing" />
</svelte:head>

{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <svelte:component this={selectedComponent} on:open-tune-up-modal={handleOpenTuneUpModal} on:open-processed-modal={handleOpenProcessedModal}/> <br>

            <Button on:click={() => (showModal = false, selectedComponent = searchComponent)} ripple>Back</Button> <br>
        </div>
    </div>
{:else}
    <Button on:click={showModal=true, handleOpenCreateModal} ripple>Create a new service record</Button> <br>
    <Button on:click={() => (showModal = true)} ripple>Access a service record</Button> <br>
    <Button ripple>Complete a service record</Button> <br>
{/if}