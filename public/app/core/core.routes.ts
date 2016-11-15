import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelinePage } from './timelinePage/timeline.page';

import { UserGuard } from '@timeline/users';

const routes: Routes = [
	{
    path: 'timeline',
    component: TimelinePage,
    canActivate: [ UserGuard ]
  },
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full'
  }
];

export const coreRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
