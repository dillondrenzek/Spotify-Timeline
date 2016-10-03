import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Timeline } from './pages/timeline/timeline.component';

import { UserGuard } from '@timeline/users';

const routes: Routes = [
	{
    path: '',
    component: Timeline,
    canActivate: [
      UserGuard
    ]
  }
];

export const coreRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
