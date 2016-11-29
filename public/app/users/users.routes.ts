import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './loginPage/login.page';
import { SpotifyUserCallback } from './spotifyUserCallback/spotifyUser.callback';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'me/callback',
    component: SpotifyUserCallback
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forChild(routes);
