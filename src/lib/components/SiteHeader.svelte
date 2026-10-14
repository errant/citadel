<script lang="ts">
	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';

	const session = $derived(page.data.session);
</script>

<header class="site-header">
	<a class="brand" href={session ? '/hall' : '/'}>Citadel</a>

	<nav aria-label="Account">
		{#if session?.user}
			<span class="who">
				{#if session.user.image}
					<img src={session.user.image} alt="" width="28" height="28" />
				{/if}
				<span class="name">{session.user.name ?? 'Alliance member'}</span>
			</span>
			<button type="button" class="ghost" onclick={() => signOut({ callbackUrl: '/' })}>
				Sign out
			</button>
		{:else}
			<button type="button" class="discord" onclick={() => signIn('discord', { callbackUrl: '/hall' })}>
				Continue with Discord
			</button>
		{/if}
	</nav>
</header>

<style>
	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.25rem clamp(1.25rem, 4vw, 2.5rem);
		animation: settle 0.7s ease both;
	}

	.brand {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.35rem;
		letter-spacing: 0.04em;
		text-decoration: none;
		color: var(--fog);
	}

	.brand:hover {
		color: var(--brass);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.who {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--mist);
		font-size: 0.92rem;
	}

	.who img {
		border-radius: 999px;
		border: 1px solid rgba(215, 224, 232, 0.25);
	}

	.name {
		max-width: 12rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.discord,
	.ghost {
		border: 0;
		border-radius: var(--radius);
		padding: 0.55rem 0.95rem;
		font-weight: 600;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.discord {
		background: var(--discord);
		color: white;
	}

	.discord:hover {
		background: var(--discord-hover);
		transform: translateY(-1px);
	}

	.ghost {
		background: transparent;
		color: var(--mist);
		border: 1px solid rgba(158, 176, 192, 0.35);
	}

	.ghost:hover {
		color: var(--fog);
		border-color: rgba(215, 224, 232, 0.55);
	}

	@keyframes settle {
		from {
			opacity: 0;
			transform: translateY(-0.4rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
