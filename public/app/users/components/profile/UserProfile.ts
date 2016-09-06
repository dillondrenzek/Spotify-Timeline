import { Component, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyUserService, SessionToken } from '../../spotify/spotifyUser.service';
import { User, UserProfileObject } from '../../models/User';
import { Playlist } from '../../../models/Playlist';

declare var localStorage: any;



@Component({
	selector: 'user-profile',
	moduleId: module.id,
	templateUrl: './user-profile.html',
	styleUrls: ['./user-profile.css']
})
export class UserProfile {

	user: User;
	playlists: Playlist[];

	authorized: boolean = false;

	constructor(
		private _cdr: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute,
		private _spotifyUserService: SpotifyUserService
	) {

		this.router.routerState
			.root.queryParams.subscribe( query => this.queryParamsChanged(query));

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
		console.warn('currentUserChanged', user);
		this.user = <User>user;
	}

	currentUserPlaylistsChanged(playlists: any) {
		this.playlists = playlists;
	}

	loginButtonClicked() {
		this._spotifyUserService.login();
	}

	getPlaylistsClicked() {
		this._spotifyUserService.getPlaylists();
	}

	ngAfterViewInit() {
		this._spotifyUserService.getPlaylists();
	}

	ngOnInit() {
		this._spotifyUserService.login();
	}
}
