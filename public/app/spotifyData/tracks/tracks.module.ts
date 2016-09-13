import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { RouterModule } 			from '@angular/router';

import { tracksRoutes } 			from './tracks.routes';

import { TrackComponent } 			from './components/track/track.component';
import { TracksListComponent } 		from './components/tracksList/tracksList.component';

export { TrackComponent } 			from './components/track/track.component';
export { TracksListComponent } 		from './components/tracksList/tracksList.component';
export { Track } 					from './models/Track';



@NgModule({
	declarations: [
		TrackComponent,
		TracksListComponent
	],
	exports: [
		TrackComponent,
		TracksListComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(tracksRoutes)
	]
})
export class TracksModule {}
