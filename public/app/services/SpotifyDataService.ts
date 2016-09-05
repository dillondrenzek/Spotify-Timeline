import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Track } from '../models/Track';
import { Playlist } from '../models/Playlist';

declare var localStorage: any;


@Injectable()
export class SpotifyDataService {

	spotifyApiUrl: string = 'https://api.spotify.com/v1/';

	constructor(private _http: Http) {

	}

	getTrackById(id: string): Observable<Track> {
		return Observable.create((obs: Subscriber<Track>) => {

			let url: string = this.spotifyApiUrl + 'tracks/'+ id;

			this._http
				.get(url)
				.subscribe(trackObject => {
					let track: Track = this.receivedTrackObject(trackObject);
					obs.next(track);
					obs.complete();
				});
		});
	}


	getPlaylistById(id: string): Observable<Playlist> {
		return Observable.create((obs: Subscriber<Playlist>) => {

			let url: string = this.spotifyApiUrl + 'tracks/'+ id;

			this._http
				.get(url)
				.subscribe(playlistObject => {
					let playlist: Playlist = this.receivedPlaylistObject(playlistObject);
					obs.next(playlist);
					obs.complete();
				});
		});
	}



	private receivedTrackObject(res: Response): Track {
		return new Track(res.json());
	}


	private receivedPlaylistObject(res: Response): Playlist {
		return new Playlist(res.json());
	}


}
