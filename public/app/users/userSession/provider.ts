import { UserSession } from './userSession';

const userSession = new UserSession();

export const userSessionProvider = { provide: UserSession, useValue: userSession };
