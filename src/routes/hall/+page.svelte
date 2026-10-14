<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	const session = $derived(page.data.session);
	const name = $derived(session?.user?.name ?? 'Alliance lead');
</script>

<svelte:head>
	<title>Hall · Citadel</title>
</svelte:head>

<main class="hall" in:fade={{ duration: 280 }}>
	<p class="eyebrow">Management hall</p>
	<h1>Welcome, {name}.</h1>
	<p class="lede">
		You’re signed in with Discord. This shell is ready for kingdom tools — roster notes, callouts,
		and Alliance ops — without touching official game servers.
	</p>

	<section class="panel" aria-labelledby="next-heading">
		<h2 id="next-heading">What’s next</h2>
		<ul>
			<li>Brand the hall for your kingdom name and colours.</li>
			<li>Add the first management modules your Alliance actually needs.</li>
			<li>Ship a tagged release so other kingdoms can deploy their own Citadel.</li>
		</ul>
	</section>
</main>

<style>
	.hall {
		flex: 1;
		width: min(42rem, 100%);
		margin: 0 auto;
		padding: clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2.5rem) 4rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.8rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--brass);
		font-weight: 600;
	}

	h1 {
		margin: 0 0 0.75rem;
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 4vw, 2.4rem);
		font-weight: 700;
		line-height: 1.15;
	}

	.lede {
		margin: 0 0 2rem;
		color: var(--mist);
	}

	.panel {
		padding: 1.25rem 0 0;
		border-top: 1px solid rgba(158, 176, 192, 0.22);
	}

	h2 {
		margin: 0 0 0.75rem;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
	}

	ul {
		margin: 0;
		padding-left: 1.15rem;
		color: var(--mist);
	}

	li + li {
		margin-top: 0.45rem;
	}
</style>
