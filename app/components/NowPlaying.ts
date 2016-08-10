import { Component, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { Track } from '../models/Track';

import { ArtistComponent } from './ArtistComponent';
import { AlbumComponent } from './AlbumComponent';

import { DurationPipe } from '../pipes/DurationPipe';
import { EmbedUriPipe } from '../pipes/EmbedUriPipe';

@Component({
	selector: 'now-playing',
	templateUrl: 'app/components/now-playing.html',
	styleUrls: ['built/css/components/now-playing.html'],
	directives: [ ArtistComponent, AlbumComponent ],
	pipes: [ DurationPipe, EmbedUriPipe ]
})

export class NowPlaying {

	track: Track;

	constructor(
		private http: Http,
		private _cdr: ChangeDetectorRef,
		private sanitizer: DomSanitizationService
	) {}

	ngOnInit() {
		this.getTrackById('0Sl8C9oeS3b5Kv9bSvTPDr');
	}

	getTrackById(id: string) {
		let url: string = 'https://api.spotify.com/v1/tracks/'+ id;
		this.http
			.get(url)
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
