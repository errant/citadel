# Citadel

Community website and management shell for **Kingshot Kingdom** Alliance leads.

Citadel is a **public, deployable package**: you run your own instance on your own [Vercel](https://vercel.com) account. It is **not** official Kingshot software, **not** a game-server admin panel, and it has **no official Kingshot API**.

This repo is the MVP scaffold: SvelteKit UI + [Auth.js](https://authjs.dev) Discord login + an authenticated “hall” shell.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) 2 + Svelte 5 (runes)
- [Auth.js](https://authjs.dev) via `@auth/sveltekit` (Discord provider)
- `@sveltejs/adapter-vercel`

Kit 2 is intentional for this MVP: current `@auth/sveltekit` targets Kit 1–2 and is not yet compatible with Kit 3’s `$app/paths` API. Svelte 5 runes are still used throughout.

## Local development

Requires **Node.js ≥ 20**.

```sh
cp .env.example .env
# fill AUTH_SECRET, AUTH_DISCORD_ID, AUTH_DISCORD_SECRET
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Discord application setup

1. Create an application at [Discord Developer Portal](https://discord.com/developers/applications).
2. Under **OAuth2 → Redirects**, add:
   - `http://localhost:5173/auth/callback/discord`
   - `https://YOUR_PRODUCTION_DOMAIN/auth/callback/discord`
3. Copy **Client ID** → `AUTH_DISCORD_ID` and **Client Secret** → `AUTH_DISCORD_SECRET`.
4. Generate a session secret (≥32 chars) for `AUTH_SECRET`, e.g. `openssl rand -base64 32`.
5. Set `AUTH_URL` to your site origin (`http://localhost:5173` locally).

Do not commit real credentials. Placeholders in `.env.example` stay empty.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | Yes | Encrypts Auth.js sessions |
| `AUTH_DISCORD_ID` | Yes | Discord OAuth client ID |
| `AUTH_DISCORD_SECRET` | Yes | Discord OAuth client secret |
| `AUTH_URL` | Prod recommended | Canonical site URL |
| `AUTH_TRUST_HOST` | Optional | Trust host header when needed |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (Vercel adapter) |
| `npm run preview` | Preview production build |
| `npm run check` | `svelte-check` / types |
| `npm run lint` | Prettier + ESLint |

## Deploy story (Vercel)

Operators will eventually install a **tagged release** via a setup script (clone tag → guided config → Vercel project/env). That packaging plan lives in the project’s setup-approach doc (Agent Store / project docs), not as automation in this MVP.

Until then:

1. Import this repo into your Vercel project (SvelteKit / adapter-vercel).
2. Set the env vars above in the Vercel dashboard.
3. Add the production Discord redirect URL.
4. Deploy.

## Out of scope (for now)

- Setup CLI automation
- Official Kingshot / publisher APIs
- Heavy kingdom feature modules beyond the authenticated shell
