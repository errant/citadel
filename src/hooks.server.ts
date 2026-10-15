import { building } from '$app/env';
import { redirect } from '@sveltejs/kit';
import { sequence, type Handle } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '#lib/auth.js';

const authHandle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	} else {
		event.locals.session = null;
		event.locals.user = null;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const protectHall: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/hall') && !event.locals.user) {
		redirect(303, '/');
	}

	return resolve(event);
};

export const handle = sequence(authHandle, protectHall);
