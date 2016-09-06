import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, UserProfileObject } from '../models/User';
import { Playlist } from '../../models/Playlist';


declare var localStorage: any;

export interface SessionToken {
	access: string,
	refresh: string
};


@Injectable()
export class SpotifyUserService {

	/**
	 * Current User
	 */

	// Observable currentUser
	currentUser$: Observable<User>;
	// currentUser reference
	private _cU: User = null;
	// currentUser subject
	private cUSource: BehaviorSubject<User> = new BehaviorSubject<User>(this._cU);

	/**
	 * Current User Playlists
	 */

	// Observable currentUserPlaylists
	currentUserPlaylists$: Observable<Playlist[]>;
	// currentUserPlaylist reference
	private _cUP: Playlist[] = null;
	// currentUserPlaylist subject
	private cUPSource: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>(this._cUP);


	/**
	 * Spotify API session tokens
	 */
	sessionTokens: SessionToken = null;
	localStoragePrefix: string = 'spotify-timeline:';
	access_token_key: string = this.localStoragePrefix + 'access_token';
	refresh_token_key: string = this.localStoragePrefix + 'refresh_token';

	constructor(private _http: Http) {
		// initialize Observables
		this.currentUser$ = this.cUSource.asObservable();
		this.currentUserPlaylists$ = this.cUPSource.asObservable();
	}


	/**
	 * Public method for logging in to Spotify API service
	 */
	login() {
		console.warn('login', this.sessionTokens);
		if (!this.sessionTokens) {
			this.sessionTokens = this.getSessionTokens();
		} else {
			return;
		}
		var req = new Request({
			method: RequestMethod.Get,
			url: 'https://api.spotify.com/v1/me',
			headers: new Headers({
				'Authorization': 'Bearer ' + this.sessionTokens['access']
			})
		});

		this._http
			.request(req)
			.subscribe(res => {
				let user = User.fromJSON(res.json());
				this.setCurrentUser(user);
			});
	}

	getSessionTokens(): SessionToken {
		let tokens: SessionToken = {access: null, refresh: null};
		if (!this.sessionTokens) {
			tokens = {
				access: localStorage.getItem(this.access_token_key),
				refresh: localStorage.getItem(this.refresh_token_key)
			};
		} else {
			tokens = this.sessionTokens;
		}
		console.warn('getSessionTokens', tokens);
		return tokens;
	}

	setSessionTokens(queryTokens: SessionToken) {
		this.sessionTokens = queryTokens;
		localStorage.setItem(this.access_token_key, this.sessionTokens.access);
		localStorage.setItem(this.refresh_token_key, this.sessionTokens.refresh);
	}

	getCurrentUser(): User {
		return this._cU;
	}

	setCurrentUser(u: User) {
		console.warn('setCurrentUser', u);
		this._cU = u;
		this.cUSource.next(u);
	}

	getPlaylists() {
		if (!this._cU) { console.warn('no currentUser'); return; }


		var access_token = (this.sessionTokens) ? this.sessionTokens['access'] : '';
		var req: Request = new Request({
			method: RequestMethod.Get,
			url: 'https://api.spotify.com/v1/users/'+this._cU.id+'/playlists',
			headers: new Headers({
				'Authorization': 'Bearer ' + access_token
			})
		});

		this._http
			.request(req)
			.subscribe(res => {

				let data: any = res.json();

				// create playlist objects
				let playlist_objects = data['items'];
				let playlists: Playlist[] = [];
				for (var i = 0; i < playlist_objects.length; i++) {
					playlists.push(new Playlist(playlist_objects[i]));
				}
				// console.warn('get playlists', playlists);

				this._cUP = playlists;
				this.cUPSource.next(playlists);
			});
	}

}
