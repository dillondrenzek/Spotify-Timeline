import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login } from './components/login/login.component';
import { UserProfile } from './components/userProfile/userProfile.component';
import { UserProfileCallback } from './components/userProfileCallback/userProfileCallback.component';

const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'me/callback',
    component: UserProfileCallback
  },
  {
    path: 'me',
    component: UserProfile
  }

];

export const usersRoutes: ModuleWithProviders = RouterModule.forChild(routes);
