import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';

import { AlbumComponent } 			from './components/album/album.component';

export { AlbumComponent } 			from './components/album/album.component';
export { Album } 					from './models/Album';



@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		AlbumComponent
	],
	exports: [
		AlbumComponent
	]
})
export class AlbumsModule {}
