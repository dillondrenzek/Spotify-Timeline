import { Component, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyUserService, SessionToken } from '../services/SpotifyUserService';
import { User, UserProfileObject } from '../models/User';
import { PlaylistComponent } from './PlaylistComponent';
import { Playlist } from '../models/Playlist';

declare var localStorage: any;



@Component({
	selector: 'user-profile',
	templateUrl: 'app/components/user-profile.html',
	styleUrls: ['built/css/components/user-profile.css'],
	directives: [ PlaylistComponent ]
})
export class UserProfile {

	user: User;
	playlists: Playlist[];

	authorized: boolean = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _spotifyUserService: SpotifyUserService
	) {

		this.router.routerState
			.queryParams.subscribe( query => this.queryParamsChanged(query));

		this._spotifyUserService.currentUser$.subscribe( user => this.currentUserChanged(user));

		this._spotifyUserService.currentUserPlaylists$.subscribe( playlists => this.currentUserPlaylistsChanged(playlists));
	}


	queryParamsChanged(query: Object) {
		let access_token: string = query['access_token'];
		let refresh_token: string = query['refresh_token'];

		if (access_token && refresh_token) {
			this._spotifyUserService.setSessionTokens({
				access: access_token,
				refresh: refresh_token
			});
			this.authorized = true;
			this.router.navigateByUrl('/me');
		} else {
			if (this.authorized) {
				this._spotifyUserService.login();
			}
		}
	}

	currentUserChanged(user: any) {
		this.user = <User>user;
	}

	currentUserPlaylistsChanged(playlists: any) {
		// console.warn('playlists changed:', playlists);
		this.playlists = playlists;
	}

	loginButtonClicked() {
		this._spotifyUserService.login();
	}

	getPlaylistsClicked() {
		this._spotifyUserService.getPlaylists();
	}

	ngOnInit() {
		// this._spotifyUserService.getPlaylists();
		// this._spotifyUserService.getPlaylists().subscribe( playlists => this.currentUserPlaylistsChanged(playlists));
	}
}
