import { Routes } from '@angular/router';

import { UserProfile } 	from './components/profile/UserProfile';

export const usersRoutes: Routes = [

	// { path: 'playlist/:id', 	component: PlaylistPageComponent},
	//
	// { path: 'play/:id', 		component: NowPlaying },
	// { path: 'play', 			component: NowPlaying },

	{ path: 'me/:query', 		component: UserProfile },
	{ path: 'me', 				component: UserProfile }

	// { path: '', 				component: NowPlaying }
];
