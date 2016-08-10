import { Component, Input } from '@angular/core';

import { Playlist } from '../models/Playlist';

@Component({
	selector: 'playlist',
	templateUrl: 'app/components/playlist-component.html',
	styleUrls: ['built/css/components/playlist-component.css']
})

export class PlaylistComponent {

	@Input() playlist: Playlist;


	// 'list' or 'page'
	@Input('componentMode') mode: string = 'list';

}
