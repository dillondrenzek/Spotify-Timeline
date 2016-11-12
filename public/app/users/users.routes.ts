import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './loginPage/login.page';
import { UserProfileCallback } from './userProfile/userProfile.callback';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
	{
    path: 'me/callback',
    component: UserProfileCallback
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forChild(routes);
