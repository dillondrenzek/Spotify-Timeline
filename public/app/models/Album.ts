export class Album {

	private _album: Object = {};

	constructor(spotifyAlbum: any){
		this._album = spotifyAlbum;
	}



	// "album_type": "album",
	get album_type(): string {
		return this._album['album_type'] || null;
	}



	//   "available_markets": [
	//     "CA",
	//     "MX",
	//     "US"
	//   ],
	get available_markets(): string[] {
		return this._album['available_markets'] || null;
	}



	//   "external_urls": {
	//     "spotify": "https://open.spotify.com/album/25sYZjutddzUpXNbeQ7bEC"
	//   },
	get external_urls(): Object {
		return this._album['external_urls'] || null;
	}



	//   "href": "https://api.spotify.com/v1/albums/25sYZjutddzUpXNbeQ7bEC",
	get href(): string {
		return this._album['href'] || null;
	}



	//   "id": "25sYZjutddzUpXNbeQ7bEC",
	get id(): string {
		return this._album['id'] || null;
	}

	//   "images": [
	//     {
	//       "height": 640,
	//       "url": "https://i.scdn.co/image/4b2d699e578f6b47a653faf95280e22618a927d9",
	//       "width": 640
	//     },
	//     {
	//       "height": 300,
	//       "url": "https://i.scdn.co/image/74dba4718f87fbc4b9ce6c82eaf2af971c54aca3",
	//       "width": 300
	//     },
	//     {
	//       "height": 64,
	//       "url": "https://i.scdn.co/image/f6eaf3f668a2c44b4213692e700948ab91c96abb",
	//       "width": 64
	//     }
	//   ],
	get images(): Object[] {
		return this._album['images'] || null;
	}



	//   "name": "How I Got Over (Explicit Version)",
	get name(): string {
		return this._album['name'] || null;
	}



	//   "type": "album",
	get type(): string {
		return this._album['type'] || null;
	}



	//   "uri": "spotify:album:25sYZjutddzUpXNbeQ7bEC"
	get uri(): string {
		return this._album['uri'] || null;
	}

}
