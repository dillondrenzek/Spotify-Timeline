import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaylistListItem } from './list-item/PlaylistListItem.component';
import { PlaylistPageComponent } from './page/PlaylistPage.component';

export { PlaylistListItem } from './list-item/PlaylistListItem.component';
export { PlaylistPageComponent } from './page/PlaylistPage.component';
export { Playlist } from './models/Playlist';



@NgModule({
	declarations: [
		PlaylistListItem,
		PlaylistPageComponent
	],
	exports: [
		PlaylistListItem,
		PlaylistPageComponent
	],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class PlaylistsModule {}
