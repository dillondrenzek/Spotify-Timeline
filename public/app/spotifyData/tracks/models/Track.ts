import { Album } from '../../models/Album';
import { Artist } from '../../models/Artist';

export class Track {

	private _artists: Artist[];
	private _album: Album;
	private _track: Object = {};

	constructor(spotifyTrack: any){
		this._track = spotifyTrack;
		this._album = new Album(this._track['album']);
		this._artists = this.getArtists(this._track['artists']);
	}

	private getArtists(artists: Object[]): Artist[] {
		let ret: Artist[] = [];
		for (var i = 0; i < artists.length; i++ ) {
			let artist = new Artist(artists[i]);
			ret.push(artist);
		}
		return ret;
	}

	/**
	 * `album`
	 * { Album }
	 * The album on which the track appears. The album object includes a link in href to full information about the album.
	 */
	get album(): Album { return this._album || null; }



	/**
	 * `artists`
	 * { array } - an array of simplified artist objects
	 * The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.
	 */
	get artists(): Object[] { return this._track['artists'] || null; }



	/**
	 * `available_markets`
	 * { array } - array of strings
	 * A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
	 */
	get available_markets(): string[] { return this._track['available_markets'] || null; }



	/**
	 * `disc_number`
	 * { integer }
	 * The disc number (usually 1 unless the album consists of more than one disc).
	 */
	get disc_number(): number { return this._track['disc_number'] || null; }



	/**
	 * `duration_ms`
	 * { integer }
	 * The track length in milliseconds.
	 */
	get duration_ms(): number { return this._track['duration_ms'] || null; }



	/**
	 * `explicit`
	 * { Boolean }
	 * Whether or not the track has explicit lyrics (true = yes it does; false = no it does not OR unknown).
	 */
	get explicit(): boolean { return this._track['explicit'] || null; }



	/**
	 * `external_ids`
	 * { Object } - an external ID object
	 * Known external IDs for the track.
	 */
	get external_ids(): Object { return this._track['external_ids'] || null; }



	/**
	 * `external_urls`
	 * { Object } - an external URL object
	 * Known external URLs for this track.
	 */
	get external_urls(): Object { return this._track['external_urls'] || null; }



	/**
	 * `href`
	 * { string }
	 * A link to the Web API endpoint providing full details of the track.
	 */
	get href(): string { return this._track['href'] || null; }



	/**
	 * `id`
	 * { string }
	 * The Spotify ID for the track.
	 */
	get id(): string { return this._track['id'] || null; }



	/**
	 * `is_playable`
	 * { boolean }
	 * Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.
	 */
	get is_playable(): boolean { return this._track['is_playable'] || null; }



	/**
	 * `linked_from`
	 * { Object } - a linked track object
	 * Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track.
	 */
	get linked_from(): Object { return this._track['linked_from'] || null; }



	/**
	 * `name`
	 * { string }
	 * The name of the track.
	 */
	get name(): string { return this._track['name'] || null; }



	/**
	 * `popularity`
	 * { integer }
	 * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
	 */
	get popularity(): number { return this._track['popularity'] || null; }



	/**
	 * `preview_url`
	 * { string }
	 * A link to a 30 second preview (MP3 format) of the track.
	 */
	get preview_url(): string { return this._track['preview_url'] || null; }



	/**
	 * `track_number`
	 * { integer }
	 * The number of the track. If an album has several discs, the track number is the number on the specified disc.
	 */
	get track_number(): number { return this._track['track_number'] || null; }



	/**
	 * `type`
	 * { string }
	 * The object type: "track".
	 */
	get type(): string { return this._track['type'] || null; }



	/**
	 * `uri`
	 * { string }
	 * The Spotify URI for the track.
	 */
	get uri(): string { return this._track['uri'] || null; }



	// get embed_uri(): string { return 'https://embed.spotify.com/?uri='+this._track['uri']; }

}