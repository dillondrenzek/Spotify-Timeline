import { Component, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Track } from '../models/Track';

import { ArtistComponent } from './ArtistComponent';
import { AlbumComponent } from './AlbumComponent';

@Component({
	selector: 'now-playing',
	templateUrl: 'app/components/now-playing.html',
	styleUrls: ['built/css/components/now-playing.html'],
	directives: [ ArtistComponent, AlbumComponent ]
})

export class NowPlaying {

	track: Track;

	constructor(
		private http: Http,
		private _cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.http
			.get('https://api.spotify.com/v1/tracks/1iP5UMdOsGz6EdltGbbcb7')
			.subscribe(tO => this.receivedTrackObject(tO));
	}

	receivedTrackObject(res: Response) {
		console.warn('res:', res);
		let track = res.json();
		this.track = new Track(track);
		this._cdr.detectChanges();
		console.warn('track:', this.track);
	}
}
