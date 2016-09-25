import { Component, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SessionToken, UserService } from '../../services/user.service';
// // import { SpotifyUserService, SessionToken } from '@timeline/spotify-users';
// // import { SpotifyUserService, SessionToken } from '../../spotify/spotifyUser.service';
// // import { User, UserProfileObject } from '../../models/User';
// //
// // import { Playlist } from '../../../playlists/playlists.module';
//
// declare var localStorage: any;
//
//
//
@Component({
	selector: 'user-profile',
	moduleId: module.id,
	templateUrl: './userProfile.component.html',
	styleUrls: ['./userProfile.component.css']
})
export class UserProfile {
//
// 	user: User;
// 	playlists: Playlist[];
//
// 	authorized: boolean = false;
//
  access_token: string;
  refresh_token: string;

	constructor(
// 		private _cdr: ChangeDetectorRef,
		private router: Router,
    private userService: UserService
// 		private route: ActivatedRoute,
// 		private _spotifyUserService: SpotifyUserService
	) {

		this.router.routerState
			.root.queryParams.subscribe( query => this.queryParamsChanged(query));

// 		this._spotifyUserService.currentUser$.subscribe( user => this.currentUserChanged(user));
//
// 		this._spotifyUserService.currentUserPlaylists$.subscribe( playlists => this.currentUserPlaylistsChanged(playlists));
	}


	queryParamsChanged(query: Object) {
		let access_token: string = query['access_token'];
		let refresh_token: string = query['refresh_token'];

		if (access_token && refresh_token) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
			this.userService.setSessionToken(new SessionToken(access_token, refresh_token));
			this.router.navigateByUrl('/me');
		} else {
      // this.router.navigateByUrl('/login');
			// if (this.authorized) {
			// 	this._spotifyUserService.login();
			// }
		}
	}
//
// 	currentUserChanged(user: any) {
// 		console.warn('currentUserChanged', user);
// 		this.user = <User>user;
// 	}
//
// 	currentUserPlaylistsChanged(playlists: any) {
// 		this.playlists = playlists;
// 	}
//
// 	loginButtonClicked() {
// 		this._spotifyUserService.login();
// 	}
//
// 	getPlaylistsClicked() {
// 		this._spotifyUserService.getPlaylists();
// 	}
//
// 	ngAfterViewInit() {
// 		this._spotifyUserService.getPlaylists();
// 	}
//
// 	ngOnInit() {
// 		this._spotifyUserService.login();
// 	}
}
