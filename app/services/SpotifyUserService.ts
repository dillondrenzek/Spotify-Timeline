import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, UserProfileObject } from '../models/User';
import { Playlist } from '../models/Playlist';


declare var localStorage: any;

export interface SessionToken {
	access: string,
	refresh: string
};


@Injectable()
export class SpotifyUserService {

	private _sessionTokens: SessionToken = { access: null, refresh: null };

	private _currentUser: User = null;
	private currentUserSource: BehaviorSubject<User> = new BehaviorSubject<User>(this._currentUser);
	currentUser$: Observable<User>;

	private _currentUserPlaylists: Playlist[] = null;
	private currentUserPlaylistsSource: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>(this._currentUserPlaylists);
	currentUserPlaylists$: Observable<Playlist[]>;


	constructor(private _http: Http) {
		this.currentUser$ = this.currentUserSource.asObservable();
		this.currentUserPlaylists$ = this.currentUserPlaylistsSource.asObservable();
	}

	get sessionTokens(): SessionToken { return this._sessionTokens; }
	set sessionTokens(queryTokens: SessionToken){
		this._sessionTokens = queryTokens;
	}

	login() {
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
			.map(res => {

				let data = res.json();

				let newUserOptions: UserProfileObject = {
					display_name: 	data['display_name'],
					id: 			data['id'],
					email: 			data['email'],
					external_urls: 	data['external_urls'],
					href: 			data['href'],
					images: 		data['images'],
					country: 		data['country']
				};

				let user = new User(newUserOptions);

				this.setCurrentUser(user);

			}).subscribe();
	}

	setSessionTokens(queryTokens: SessionToken) {
		this.sessionTokens = queryTokens;
	}

	getCurrentUser(): User {
		return this._currentUser;
	}

	setCurrentUser(u: User) {


		this._currentUser = u;
		this.currentUserSource.next(u);
	}

	getPlaylists() {
		if (!this._currentUser) { console.warn('no currentUser'); return; }


		var access_token = (this.sessionTokens) ? this.sessionTokens['access'] : '';
		var options: RequestOptions = new RequestOptions({
			method: RequestMethod.Get,
			url: 'https://api.spotify.com/v1/users/'+this._currentUser.id+'/playlists',
			headers: new Headers({
				'Authorization': 'Bearer ' + access_token
			})
		});

		this._http
			.request(new Request(options))
			.map(res => {

				let data: any = res.json();

				// create playlist objects
				let playlist_objects = data['items'];
				let playlists: Playlist[] = [];
				for (var i = 0; i < playlist_objects.length; i++) {
					playlists.push(new Playlist(playlist_objects[i]));
				}
				console.warn('get playlists', playlists);

				this._currentUserPlaylists = playlists;
				this.currentUserPlaylistsSource.next(playlists);
			}).subscribe();
	}

}
