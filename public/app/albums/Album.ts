export interface AlbumInit {
  artworkUri: string
}

export class Album {

  constructor( private _init = {
    artworkUri: null
  } ) {}

  get artworkUri(): string { return this._init.artworkUri; }

}
