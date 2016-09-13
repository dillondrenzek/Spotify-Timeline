import { Component, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Track } from '../tracks/tracks.module';

import { ArtistComponent } from './artist.component';
import { AlbumComponent } from './album.component';

import { DurationPipe } from '../commonPipes/commonPipes.module';
import { EmbedUriPipe } from '../commonPipes/commonPipes.module';
import { SpotifyDataService } from '../services/SpotifyDataService';

@Component({
	selector: 'now-playing',
	moduleId: module.id,
	templateUrl: './nowPlaying.component.html',
	styleUrls: ['./nowPlaying.component.css']
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
