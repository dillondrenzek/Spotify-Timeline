import { Routes } from '@angular/router';

import { PlaylistPageComponent } 	from './page/PlaylistPage.component';

export const playlistsRoutes: Routes = [
	{ path: 'playlist/:id', 	component: PlaylistPageComponent}
];
