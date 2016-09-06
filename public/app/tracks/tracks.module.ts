import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { tracksRoutes } from './tracks.routes';

export { Track } from './models/Track';

@NgModule({
	declarations: [

	],
	exports: [
		
	],
	imports: [
		CommonModule,
		RouterModule.forChild(tracksRoutes)
	]
})
export class TracksModule {}
