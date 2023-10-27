<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/bikes' ? 'page' : undefined}>
				<a href="/bikes">Bikes</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/service') ? 'page' : undefined}>
				<a href="/service">Service</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/contacts') ? 'page' : undefined}>
				<a href="/contacts">Contacts</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<img src = "https://zummobike.com/wp-content/uploads/2022/08/LogoBlu-300x300@2x.png" alt="Zummo Bike" width="120" height="120"/>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
        top: 0;
        left: 0;
        right: 0;
		--background: rgba(40, 126, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 10px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
