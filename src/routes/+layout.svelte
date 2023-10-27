<script>
	import "../app.css"
	import Header from './Header.svelte';
	import { SvelteUIProvider, Button } from '@svelteuidev/core';
	import './styles.css';
</script>

<SvelteUIProvider>
	<div class="app">
		<Header />

		<main>
			<slot />
		</main>
		
	</div>
</SvelteUIProvider>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
