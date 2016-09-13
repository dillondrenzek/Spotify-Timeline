import { Routes } 					from '@angular/router';

import { TracksListComponent } 		from './components/tracksList/tracksList.component';

export const tracksRoutes: Routes = [
	{ path: 'track/:id', component: TracksListComponent }
];
