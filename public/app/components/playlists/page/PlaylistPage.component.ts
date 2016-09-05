import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Playlist } from '../../../models/Playlist';

@Component({
	selector: 'playlist-page',
	moduleId: module.id,
	templateUrl: './playlist-page.component.html',
	styleUrls: ['./playlist-page.component.css']
})

export class PlaylistPageComponent {

	playlist: Playlist;

	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {
		this.router.routerState
			.root.queryParams.subscribe( query => this.queryParamsChanged(query));
	}

	queryParamsChanged(query: Object) {
		console.warn('query', query);

		// let access_token: string = query['access_token'];
		// let refresh_token: string = query['refresh_token'];

		// if (access_token && refresh_token) {
		// 	this._spotifyUserService.setSessionTokens({
		// 		access: access_token,
		// 		refresh: refresh_token
		// 	});
		// 	this.authorized = true;
		// 	this.router.navigateByUrl('/me');
		// } else {
		// 	if (this.authorized) {
		// 		this._spotifyUserService.login();
		// 	}
		// }
	}
}
