import { Artist } from '@timeline/artists';
import { Album } from '@timeline/albums';

export type GroupedTracks = Tracks[];

export type Tracks = Track[];

export class Track {

  private _id: string = null;
  private _date_added: string = null;
  private _name: string = null;
  private _artistIds: string[] = null;
  private _artist: Artist = null;
  private _albumId: string = null;
  private _album: Album = null;
  private _artworkUri: string = null;

  constructor(obj = {}) {

    this._id = obj['id'];
    this._date_added = obj['added_at'];
    this._name = obj['name'];
    this._artistIds = obj['artists'].map((a: any) => {
      return a['id'];
    });
    this._albumId = (obj['album']) ? obj['album']['id'] : null;
    this._artworkUri = (obj['images']) ? obj['images'][0] : null;
  }

  get id(): string { return this._id; }

  get date_added(): string { return new Date(this._date_added).toISOString(); }

  get name(): string { return this._name; }

  get artistIds(): string[] { return this._artistIds; }

  get artist(): Artist { return this._artist; }

  get albumId(): string { return this._albumId; }
  get album(): Album { return this._album; }

  get artworkUri(): string { return this._artworkUri; }

  setArtist(artist: Artist) {
    this._artist = artist;
    return this;
  }

  setAlbum(album: Album) {
    this._album = album;
    return this;
  }

  toJSON(): Object {
    return {
      id: this.id,
      date_added: this.date_added,
      name: this.name,
      artists: this.artistIds
    }
  }
}
