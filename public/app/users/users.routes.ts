import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileCallback } from './userProfileCallback/userProfileCallback.component';

import { UserGuard } from '@timeline/users';

const routes: Routes = [
	{
    path: 'me/callback',
    component: UserProfileCallback
    // canActivate: [
    //   UserGuard
    // ]
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forChild(routes);
