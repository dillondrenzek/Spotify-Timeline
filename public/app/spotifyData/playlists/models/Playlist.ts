export class Playlist {

	private _playlist: Object = {};

	constructor(spotifyPlaylist: any){
		this._playlist = spotifyPlaylist;
	}

	// collaborative
	get collaborative(): boolean { return this._playlist['collaborative']; }
	// external_urls
	get external_urls(): Object { return this._playlist['external_urls']; }
	// href
	get href(): string { return this._playlist['href']; }
	// id
	get id(): string { return this._playlist['id']; }
	// images
	get images(): any[] { return this._playlist['images']; }
	// name
	get name(): string { return this._playlist['name']; }
	// owner
	get owner(): Object { return this._playlist['owner']; }
	// public
	get public(): Object { return this._playlist['public']; }
	// snapshot_id
	get snapshot_id(): Object { return this._playlist['snapshot_id']; }
	// tracks
	get tracks(): Object { return this._playlist['tracks']; }
	// type
	get type(): Object { return this._playlist['type']; }
	// uri
	get uri(): Object { return this._playlist['uri']; }



}
