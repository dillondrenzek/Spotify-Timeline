import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login }                from './pages/login/login.component';
import { UserProfile }          from './pages/userProfile/userProfile.component';
import { UserProfileCallback }  from './pages/userProfileCallback/userProfileCallback.component';

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
