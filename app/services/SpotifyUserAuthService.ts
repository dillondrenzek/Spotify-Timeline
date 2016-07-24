import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// // Statics
// import 'rxjs/add/observable/throw';
//
// // Operators
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';


declare var localStorage: any;




@Injectable()
export class SpotifyUserAuthService {

	postResponse: any;

	constructor(private _http: Http) {

	}

	postResponded(res: any) {
		console.log('response', this.postResponse);
	}

	login() {

		this._http
			.get('http://localhost:8081/spotify/authorize')
			.map(this.extractData)
			.subscribe((response) => {
				// this.postResponse = JSON.stringify(response);
				console.log(response);
			});

	}

	private extractData(res: Response) {
		this.postResponse = res.json();
		console.info('postResponse', this.postResponse);
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
