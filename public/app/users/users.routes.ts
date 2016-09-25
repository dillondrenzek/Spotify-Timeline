import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: Login
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
