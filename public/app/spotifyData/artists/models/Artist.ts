export class Artist {

	private _artist: Object = {};

	constructor(spotifyArtist: any){
		this._artist = spotifyArtist;
	}

	// "external_urls": {
    //   "spotify": "https://open.spotify.com/artist/78xUyw6FkVZrRAtziFdtdu"
    // },
	get external_urls(): Object {
		return this._artist['external_urls'] || null;
	}

    // "href": "https://api.spotify.com/v1/artists/78xUyw6FkVZrRAtziFdtdu",
	get href(): string {
		return this._artist['href'] || null;
	}

    // "id": "78xUyw6FkVZrRAtziFdtdu",
	get id(): string {
		return this._artist['id'] || null;
	}

    // "name": "The Roots",
	get name(): string {
		return this._artist['name'] || null;
	}

    // "type": "artist",
	get type(): string {
		return this._artist['type'] || null;
	}

    // "uri": "spotify:artist:78xUyw6FkVZrRAtziFdtdu"
	get uri(): string {
		return this._artist['uri'] || null;
	}


	// "album_type": "album",
	get album_type(): string {
		return this._artist['album_type'] || null;
	}


}
