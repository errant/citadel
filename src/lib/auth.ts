import { getRequestEvent } from '$app/server';
import {
	BETTER_AUTH_SECRET,
	BETTER_AUTH_URL,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET
} from '$app/env/private';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';

const configuredHost = new URL(BETTER_AUTH_URL).host;

/**
 * Better Auth in database-less (stateless) mode for the MVP scaffold.
 * Sessions / OAuth account data live in encrypted cookies — no Postgres/SQLite required to boot.
 * Operators can add a database later for durable sessions and admin tooling.
 *
 * Dynamic `baseURL` lets the handler match the request host (localhost vs 127.0.0.1)
 * while still falling back to `BETTER_AUTH_URL` for OAuth callback construction.
 */
export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	baseURL: {
		allowedHosts: [configuredHost, 'localhost:5173', '127.0.0.1:5173', '*.vercel.app'],
		fallback: BETTER_AUTH_URL
	},
	socialProviders: {
		discord: {
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});

export type Session = typeof auth.$Infer.Session;
