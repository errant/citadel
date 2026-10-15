# Citadel

Community website and management shell for **Kingshot Kingdom** Alliance leads.

Citadel is a **public, deployable package**: you run your own instance on your own [Vercel](https://vercel.com) account. It is **not** official Kingshot software, **not** a game-server admin panel, and it has **no official Kingshot API**.

This repo is the MVP scaffold: SvelteKit UI + [Better Auth](https://www.better-auth.com/) Discord login + an authenticated “hall” shell.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) 3 + Svelte 5 (runes)
- [Better Auth](https://www.better-auth.com/) with Discord social provider
- `@sveltejs/adapter-vercel`

### Auth storage (MVP)

Better Auth is configured in **database-less (stateless) mode**: sessions and OAuth account data live in encrypted cookies. That keeps the package bootable on Vercel without requiring operators to provision Postgres/SQLite for the first deploy.

When you need durable users, session revocation, or Alliance admin tooling, add a database (Neon Postgres or Turso/libSQL are natural fits) and point Better Auth at it.

## Local development

Requires **Node.js ≥ 22.17**.

```sh
cp .env.example .env
# fill BETTER_AUTH_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Discord application setup

1. Create an application at [Discord Developer Portal](https://discord.com/developers/applications).
2. Under **OAuth2 → Redirects**, add:
   - `http://localhost:5173/api/auth/callback/discord`
   - `https://YOUR_PRODUCTION_DOMAIN/api/auth/callback/discord`
3. Copy **Client ID** → `DISCORD_CLIENT_ID` and **Client Secret** → `DISCORD_CLIENT_SECRET`.
4. Generate a secret (≥32 chars) for `BETTER_AUTH_SECRET`, e.g. `openssl rand -base64 32`.
5. Set `BETTER_AUTH_URL` to your site origin (`http://localhost:5173` locally).

Do not commit real credentials. Placeholders in `.env.example` stay empty.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Encrypts sessions / cookies (≥32 chars) |
| `BETTER_AUTH_URL` | Yes | Canonical site URL for OAuth callbacks |
| `DISCORD_CLIENT_ID` | Yes | Discord OAuth client ID |
| `DISCORD_CLIENT_SECRET` | Yes | Discord OAuth client secret |

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
3. Add the production Discord redirect URL (`/api/auth/callback/discord`).
4. Deploy.

## Out of scope (for now)

- Setup CLI automation
- Official Kingshot / publisher APIs
- Heavy kingdom feature modules beyond the authenticated shell
- Durable auth database (stateless cookies for MVP)
