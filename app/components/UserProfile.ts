import { Component, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyUserAuthService, SessionToken } from '../services/SpotifyUserAuthService';
import { User, UserProfileObject } from '../models/User';

declare var localStorage: any;



@Component({
	selector: 'user-profile',
	templateUrl: 'app/components/user-profile.html',
	styleUrls: ['built/css/components/user-profile.css']
})
export class UserProfile {

	user: User;

	authorized: boolean = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _spotifyUserAuthService: SpotifyUserAuthService
	) {

		this.router.routerState
			.queryParams.subscribe( query => this.queryParamsChanged(query));

		this._spotifyUserAuthService.currentUser.subscribe( user => this.currentUserChanged(user));
	}


	queryParamsChanged(query: Object) {
		let access_token: string = query['access_token'];
		let refresh_token: string = query['refresh_token'];

		if (access_token && refresh_token) {
			this._spotifyUserAuthService.setSessionTokens({
				access: access_token,
				refresh: refresh_token
			});
			this.authorized = true;
			this.router.navigateByUrl('/me');
		} else {
			if (this.authorized) {
				this._spotifyUserAuthService.login();
			}
		}
	}

	currentUserChanged(user: any) {
		this.user = <User>user;
	}

	loginButtonClicked() {
		// console.info('login button clicked');
		this._spotifyUserAuthService.login();
	}
}
