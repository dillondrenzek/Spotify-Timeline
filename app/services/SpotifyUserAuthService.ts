import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyUserAuthService {

	client_id: string = '68cbe79b60c240079457182cbca17761';
	redirect_uri: string = 'http://localhost:8888/';

	
	login() {
		var state = this.generateRandomString(16);


	}

	/**
	 * Generate a random string
	 */
	private generateRandomString(length: number) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < length; i++) {
			var randomCharIndex = Math.floor(Math.random() * possible.length);
			text += possible.charAt(randomCharIndex);
		}
		return text;
	}
}
