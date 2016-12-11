import { SpotifyImageObject } from '@timeline/spotify-api';

export class Album {

  private _artworkUri: string = null;

  constructor( obj = {} ) {
    this._artworkUri = (obj['images']) ? (<SpotifyImageObject>obj['images'][0]).url : null;
  }

  get artworkUri(): string { return this._artworkUri; }

}
