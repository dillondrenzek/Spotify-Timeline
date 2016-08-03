import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { UserProfile } from './UserProfile';

import { SpotifyUserAuthService } from '../services/SpotifyUserAuthService';

@Component({
	selector: 'spotify-login',
	templateUrl: 'app/components/spotify-login.html',
	styleUrls: ['built/css/components/spotify-login.css'],
	directives: [
		UserProfile
	]
})

export class SpotifyLogin {

	user = {
		display_name: 'test',
		id: null,
		email: null,
		external_urls: {
			spotify: null
		},
		href: null,
		images: [{url: null}],
		country: null
	};

	constructor(
		private _http: Http,
		@Inject(SpotifyUserAuthService) private _spotifyUserAuthService: SpotifyUserAuthService,
		private router: Router,
		private route: ActivatedRoute
	) {

	}

	loginButtonClicked() {
		console.info('login button clicked');
		this._spotifyUserAuthService.login();
	}

}
