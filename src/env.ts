import { building } from '$app/env';
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	BETTER_AUTH_SECRET: {
		description: 'Secret used by Better Auth to encrypt cookie sessions (≥32 chars)',
		// optional while analysing the app during `vite build`
		schema: building
			? (value) => value ?? 'build-time-placeholder-secret-min-32-chars'
			: (value) => {
					if (!value || value.length < 32) {
						throw new Error('BETTER_AUTH_SECRET must be at least 32 characters');
					}
					return value;
				}
	},
	BETTER_AUTH_URL: {
		description: 'Canonical site URL used to build OAuth callback URLs',
		schema: building
			? (value) => value ?? 'http://localhost:5173'
			: (value) => {
					if (!value) throw new Error('BETTER_AUTH_URL is required');
					return value;
				}
	},
	DISCORD_CLIENT_ID: {
		description: 'Discord OAuth application client ID',
		schema: building
			? (value) => value ?? 'placeholder'
			: (value) => {
					if (!value) throw new Error('DISCORD_CLIENT_ID is required');
					return value;
				}
	},
	DISCORD_CLIENT_SECRET: {
		description: 'Discord OAuth application client secret',
		schema: building
			? (value) => value ?? 'placeholder'
			: (value) => {
					if (!value) throw new Error('DISCORD_CLIENT_SECRET is required');
					return value;
				}
	}
});
