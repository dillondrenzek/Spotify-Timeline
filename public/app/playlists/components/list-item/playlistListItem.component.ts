import { Component, Input } 	from '@angular/core';

import { Playlist } 			from '../../models/Playlist';

@Component({
	selector: 'playlist-list-item',
	moduleId: module.id,
	templateUrl: './playlistListItem.component.html',
	styleUrls: ['./playlistListItem.component.css'],
	host: {
		// '[routerLink]': "routerLinkPath"
	}
})

export class PlaylistListItem {

	@Input('playlist') playlist: Playlist;


	// 'list' or 'page'
	@Input('componentMode') mode: string = 'list';

	get routerLinkPath(): string { return '/playlist/' + this.playlist.id; }

}