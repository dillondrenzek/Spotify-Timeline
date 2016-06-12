import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

declare var localStorage: any;




@Injectable()
export class SpotifyUserAuthService {

	stateKey: string = 'spotify_auth_state';
	response_type: string = 'token';
	client_id: string = '68cbe79b60c240079457182cbca17761';
	redirect_uri: string = 'http://localhost:8888/';

	constructor(private _http: Http) {

	}



	login() {
		var state = this.generateState(16);
		var scopes: string[] = ['playlist-modify-public', 'streaming', 'user-library-read', 'user-read-birthdate', 'user-top-read'];
		var queryString: string = this.assembleQueryString(state);

		console.info('queryString', queryString);


		// this.setLocalStorageItem(this.stateKey, )
	}


	/**
	 * Assemble the query string for the Spotify API
	 */
	private assembleQueryString(state: string): string {
		var client_id: string = this.client_id;
		var response_type: string = 'token';
		var redirect_uri: string = this.redirect_uri;

		return '';
	}



	/**
	 * Generate the state parameter to help track transactions
	 */
	private generateState(length: number) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < length; i++) {
			var randomCharIndex = Math.floor(Math.random() * possible.length);
			text += possible.charAt(randomCharIndex);
		}
		return text;
	}
}
