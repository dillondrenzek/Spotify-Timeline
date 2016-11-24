import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './loginPage/login.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  }
];

export const usersRoutes: ModuleWithProviders = RouterModule.forChild(routes);
