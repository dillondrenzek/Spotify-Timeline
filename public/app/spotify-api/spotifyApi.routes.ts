import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpotifyUserCallback } from './spotifyUser.callback';

const routes: Routes = [
	{
    path: 'me/callback',
    component: SpotifyUserCallback
  }
];

export const spotifyApiRoutes: ModuleWithProviders = RouterModule.forChild(routes);
