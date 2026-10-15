import type { Session } from '#lib/auth.js';

declare global {
	namespace App {
		interface Locals {
			session: Session['session'] | null;
			user: Session['user'] | null;
		}

		interface PageData {
			session: {
				user: Session['user'];
				session: Session['session'];
			} | null;
		}
	}
}

export {};
