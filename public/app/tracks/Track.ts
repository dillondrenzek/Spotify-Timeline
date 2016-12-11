import { Artist } from '@timeline/artists';

export type GroupedTracks = Tracks[];

export type Tracks = Track[];

export class Track {

  private _id: string = null;
  private _date_added: string = null;
  private _name: string = null;
  private _artists: string[] = null;
  private _artist: Artist = null;

  constructor(obj = {}) {

    this._id = obj['id'];
    this._date_added = obj['added_at'];
    this._name = obj['name'];
    this._artists = obj['artists'].map((a: any) => {
      return a['id'];
    });
  }

  get id(): string { return this._id; }

  get date_added(): string { return new Date(this._date_added).toISOString(); }

  get name(): string { return this._name; }

  get artists(): string[] { return this._artists; }

  get artist(): Artist { return this._artist; }

  setArtist(artist: Artist) {
    this._artist = artist;
    return this;
  }

  toJSON(): Object {
    return {
      id: this.id,
      date_added: this.date_added,
      name: this.name,
      artists: this.artists
    }
  }
}
