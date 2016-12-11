export class Album {

  private _artworkUri: string = null;

  constructor( obj = {} ) {
    this._artworkUri = obj['artworkUri'];
  }

  get artworkUri(): string { return this._artworkUri; }

}
