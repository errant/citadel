import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user || !event.locals.session) {
		return { session: null };
	}

	return {
		session: {
			user: event.locals.user,
			session: event.locals.session
		}
	};
};
