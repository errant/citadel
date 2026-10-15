<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '#lib/auth-client.js';

	const session = $derived(page.data.session);

	async function signInWithDiscord() {
		await authClient.signIn.social({
			provider: 'discord',
			callbackURL: '/hall'
		});
	}
</script>

<svelte:head>
	<title>Citadel</title>
</svelte:head>

<main class="hero">
	<div class="atmosphere" aria-hidden="true"></div>

	<div class="copy">
		<p class="brand-mark">Citadel</p>
		<h1>Your kingdom’s Alliance home base.</h1>
		<p class="lede">
			A community space Alliance leads deploy for their Kingshot kingdom — organise, announce, and
			gather without pretending to be game admin.
		</p>

		<div class="cta">
			{#if session?.user}
				<a class="primary" href="/hall">Enter the hall</a>
			{:else}
				<button type="button" class="primary" onclick={signInWithDiscord}>
					Continue with Discord
				</button>
			{/if}
		</div>
	</div>
</main>

<style>
	.hero {
		position: relative;
		flex: 1;
		display: grid;
		align-items: end;
		min-height: calc(100vh - 5rem);
		padding: clamp(2rem, 6vw, 4.5rem);
		overflow: hidden;
	}

	.atmosphere {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, transparent 0%, rgba(12, 18, 24, 0.15) 40%, rgba(12, 18, 24, 0.88) 100%),
			repeating-linear-gradient(
				-18deg,
				transparent 0 18px,
				rgba(158, 176, 192, 0.035) 18px 19px
			),
			radial-gradient(ellipse 70% 50% at 70% 30%, rgba(61, 90, 108, 0.55), transparent 70%);
		animation: drift 18s ease-in-out infinite alternate;
		pointer-events: none;
	}

	.copy {
		position: relative;
		z-index: 1;
		max-width: 36rem;
		animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.brand-mark {
		margin: 0 0 0.85rem;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.8rem, 8vw, 4.6rem);
		letter-spacing: 0.03em;
		line-height: 0.95;
		color: var(--fog);
		text-shadow: 0 0.15em 1.2em rgba(12, 18, 24, 0.55);
	}

	h1 {
		margin: 0 0 0.85rem;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.35rem, 3.2vw, 1.85rem);
		line-height: 1.2;
		color: var(--brass);
	}

	.lede {
		margin: 0 0 1.6rem;
		max-width: 32rem;
		color: var(--mist);
		font-size: 1.05rem;
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: var(--radius);
		padding: 0.8rem 1.25rem;
		background: var(--discord);
		color: white;
		font-weight: 700;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.primary:hover {
		background: var(--discord-hover);
		color: white;
		transform: translateY(-2px);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(1.25rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes drift {
		from {
			transform: scale(1) translate(0, 0);
		}
		to {
			transform: scale(1.04) translate(-1.5%, 1%);
		}
	}

	@media (max-width: 640px) {
		.hero {
			align-items: center;
		}
	}
</style>
