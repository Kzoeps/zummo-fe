<script>
	import '../app.css';
	import Header from './Header.svelte';
	import { SvelteUIProvider, Button } from '@svelteuidev/core';
	import './styles.css';

	let year = new Date().getFullYear();
</script>

<SvelteUIProvider>
	<div class="app">
		<Header />

		<main>
			<slot />
		</main>
		
		<footer>
			<p>Made with ❤️ by Conn Kids</p>
			<p>Copyright Zummo {year}</p>
		</footer>
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
	footer {
		background-color: rgb(213, 213, 213);
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 12px;
		}
	}
</style>
