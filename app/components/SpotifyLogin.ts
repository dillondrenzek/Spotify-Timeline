import { Component, Inject } from '@angular/core';

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



	constructor(
		@Inject(SpotifyUserAuthService) private _spotifyUserAuthService: SpotifyUserAuthService
	) {

	}

	login() {

	}

}
