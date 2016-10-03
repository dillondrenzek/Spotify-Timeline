import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Timeline } from './components/timeline/timeline.component';

const routes: Routes = [
	{
    path: '',
    component: Timeline
  },
  {
    path: 'timeline',
    component: Timeline
  }
];

export const coreRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
