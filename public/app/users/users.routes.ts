import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileCallback } from './userProfile/userProfile.callback';

const routes: Routes = [
	{
    path: 'me/callback',
    component: UserProfileCallback
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forChild(routes);
