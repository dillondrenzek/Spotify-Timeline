import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { tracksRoutes } from './tracks.routes';

import { TrackComponent } from './component/Track.component';
import { TracksListComponent } from './list/TracksList.component';

export { TrackComponent } from './component/Track.component';
export { TracksListComponent } from './list/TracksList.component';
export { Track } from './models/Track';



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
