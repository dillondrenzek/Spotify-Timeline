import { Routes } from '@angular/router';

import { NowPlaying } 	from './components/NowPlaying';
// import { UserProfile } 	from './components/UserProfile';
// import { PlaylistPageComponent } from './components/playlists/page/PlaylistPage.component';

export const appRoutes: Routes = [

	// { path: 'playlist/:id', 	component: PlaylistPageComponent},

	{ path: 'play/:id', 		component: NowPlaying },
	{ path: 'play', 			component: NowPlaying },

	// { path: 'me/:query', 		component: UserProfile },
	// { path: 'me', 				component: UserProfile },

	{ path: '', 				component: NowPlaying }
];
