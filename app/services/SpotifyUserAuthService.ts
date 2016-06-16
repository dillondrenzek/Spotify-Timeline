import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
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



	constructor(private _http: Http) {

	}

	login() {
		let state = this.generateState(16);
	}

	private extractData(res: Response) {
		let body = res.json();
	    return body.data || { };
	}

	private handleError(error: any) {
	  // In a real world app, we might use a remote logging infrastructure
	  // We'd also dig deeper into the error to get a better message
	  let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	  console.error(errMsg); // log to console instead
	  return Observable.throw(errMsg);
	}
	//
	// /**
	//  * Assemble the query string for the Spotify API
	//  */
	// private assembleQueryString(state: string): string {
	// 	var client_id: string = this.client_id;
	// 	var response_type: string = 'token';
	// 	var redirect_uri: string = this.redirect_uri;
	//
	// 	return ['?client_id=', client_id,
	// 	'&response_type=', response_type,
	// 	'&redirect_uri=', redirect_uri,
	// 	'&state=', state].join('');
	// }



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
