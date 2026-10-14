import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authenticationHandle } from './auth';

const authorizationHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/hall')) {
		const session = await event.locals.auth();
		if (!session?.user) {
			redirect(303, '/');
		}
	}

	return resolve(event);
};

export const handle = sequence(authenticationHandle, authorizationHandle);
