<svelte:head>
	<title>Bikes</title>
	<meta name="Bikes" content="Browse/edit bikes" />
</svelte:head>

<div class="left-align">
	<h1>Bikes</h1>

	<p>
		Bikes will be browsed and edited from here.
	</p>
</div>

<style>
    div.left-align {
        display: flex;
        flex-direction: column;
        flex: 0.6;
        align-items: flex-start; /* Align content to the left */
    }

    h1, p {
        margin-left: 0; /* Remove any default margins */
    }
</style>