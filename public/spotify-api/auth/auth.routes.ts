import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthCallback } from './auth.callback';


const routes: Routes = [
  {
    path: 'me/callback',
    component: AuthCallback
  }
];

export const authRoutes: ModuleWithProviders = RouterModule.forChild(routes);
