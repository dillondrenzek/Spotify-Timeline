import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';

import { ArtistComponent } 			from './components/artist/artist.component';

export { ArtistComponent } 			from './components/artist/artist.component';
export { Artist } 					from './models/Artist';



@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ArtistComponent
	],
	exports: [
		ArtistComponent
	]
})
export class ArtistsModule {}
