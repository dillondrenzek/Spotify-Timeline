import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, UserProfileObject } from '../models/User';


declare var localStorage: any;

export interface SessionToken {
	access: string,
	refresh: string
};


@Injectable()
export class SpotifyUserAuthService {

	postResponse: any;

	sessionTokens: SessionToken;

	currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(User.create());
	currentUser: Observable<User>;

	constructor(private _http: Http) {
		this.currentUser = this.currentUser$.asObservable();
	}

	setSessionTokens(queryTokens: SessionToken){
		this.sessionTokens = queryTokens;
	}

	login() {
		console.info('login');
		var access_token = (this.sessionTokens) ? this.sessionTokens['access'] : '';
		var options: RequestOptions = new RequestOptions({
			method: RequestMethod.Get,
			url: 'https://api.spotify.com/v1/me',
			headers: new Headers({
				'Authorization': 'Bearer ' + access_token
			})
		});

		this._http
			.request(new Request(options))
			.map(res => this.extractData(res))
			.subscribe();
	}



	private extractData(res: Response) {
		this.postResponse = res.json();
		res = this.postResponse;
		// console.info('postResponse', this.postResponse);

		let newUserOptions: UserProfileObject = {
			display_name: 	res['display_name'],
			id: 			res['id'],
			email: 			res['email'],
			external_urls: 	res['external_urls'],
			href: 			res['href'],
			images: 		res['images'],
			country: 		res['country']
		};

		let newUser = new User(newUserOptions);

		this.currentUser$.next(newUser);
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
