import { Routes } from '@angular/router';

import { UserProfile } 	from './components/profile/UserProfile';

export const usersRoutes: Routes = [

	{ path: 'me/:query', 		component: UserProfile },
	{ path: 'me', 				component: UserProfile }
	
];
