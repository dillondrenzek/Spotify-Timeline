export interface ArtistInit {
  id: string,
  name: string,
  genres: string[]
}

export class Artist {

  constructor(private _init: ArtistInit = {
    id: null,
    name: null,
    genres: null
  }) {}

  get id(): string { return this._init.id; }

  get name(): string { return this._init.name; }

  get genres(): string[] { return this._init.genres; }

  toJSON(): Object {
    return this._init;
  }
}
