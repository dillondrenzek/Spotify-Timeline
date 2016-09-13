import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { RouterModule } 			from '@angular/router';

import { PlaylistListItem } 		from './components/list-item/playlistListItem.component';
import { PlaylistPageComponent } 	from './components/page/playlistPage.component';

export { PlaylistListItem } 		from './components/list-item/playlistListItem.component';
export { PlaylistPageComponent } 	from './components/page/playlistPage.component';
export { Playlist } 				from './models/Playlist';



@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		PlaylistListItem,
		PlaylistPageComponent
	],
	exports: [
		PlaylistListItem,
		PlaylistPageComponent
	]
})
export class PlaylistsModule {}
