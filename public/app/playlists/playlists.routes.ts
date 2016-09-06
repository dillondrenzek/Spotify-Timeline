import { Routes } from '@angular/router';

import { PlaylistPageComponent } 	from './page/PlaylistPage.component';

export const playlistsRoutes: Routes = [

	{ path: 'playlist/:id', 	component: PlaylistPageComponent},
	//
	// { path: 'play/:id', 		component: NowPlaying },
	// { path: 'play', 			component: NowPlaying },

	// { path: 'me/:query', 		component: UserProfile },
	// { path: 'me', 				component: UserProfile }

	// { path: '', 				component: NowPlaying }
];
