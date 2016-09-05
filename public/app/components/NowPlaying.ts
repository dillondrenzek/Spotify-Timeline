import { Component, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Track } from '../models/Track';

import { ArtistComponent } from './ArtistComponent';
import { AlbumComponent } from './AlbumComponent';

import { DurationPipe } from '../pipes/DurationPipe';
import { EmbedUriPipe } from '../pipes/EmbedUriPipe';
import { SpotifyDataService } from '../services/SpotifyDataService';

@Component({
	selector: 'now-playing',
	moduleId: module.id,
	templateUrl: './now-playing.html',
	styleUrls: ['./now-playing.css']
})

export class NowPlaying {

	track: Track;

	constructor(
		private http: Http,
		private _cdr: ChangeDetectorRef,
		private spotifyData: SpotifyDataService
	) {}

	ngOnInit() {

		this.spotifyData.getTrackById('0Sl8C9oeS3b5Kv9bSvTPDr').subscribe((track: Track) => {
			this.track = track;
			this._cdr.detectChanges();
		});

	}
}
