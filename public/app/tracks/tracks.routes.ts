import { Routes } from '@angular/router';

import { TracksListComponent } from './list/TracksList.component';
// import { PlaylistPageComponent } 	from './page/PlaylistPage.component';

export const tracksRoutes: Routes = [

	{ path: 'track/:id', component: TracksListComponent }

	// { path: 'playlist/:id', 	component: PlaylistPageComponent},
	//
	// { path: 'play/:id', 		component: NowPlaying },
	// { path: 'play', 			component: NowPlaying },

	// { path: 'me/:query', 		component: UserProfile },
	// { path: 'me', 				component: UserProfile }

	// { path: '', 				component: NowPlaying }
];
