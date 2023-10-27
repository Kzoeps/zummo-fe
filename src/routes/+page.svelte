<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/zummo.png';
	import { Chip } from '@svelteuidev/core';
</script>

<svelte:head>
	<title>Zummo</title>
	<meta name="description" content="Zummo bike management app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<img src={welcome} alt="Welcome" />
			</picture>
		</span>
		Zummo-Bike
	</h1>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

</style>
