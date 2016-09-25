import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login } from './components/login/login.component';
import { UserProfile } from './components/userProfile/userProfile.component';

const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'me',
    component: UserProfile
  },
  {
    path: 'me/:query',
    component: UserProfile
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
