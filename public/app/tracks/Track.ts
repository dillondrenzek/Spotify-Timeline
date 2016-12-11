import { Artist } from '@timeline/artists';
import { Album } from '@timeline/albums';

export type GroupedTracks = Tracks[];

export type Tracks = Track[];


export interface TrackInit {
  id: string,
  date_added: string
  name: string,
  artistIds: string[],
  albumId: string
}

export class Track {

  private _artist: Artist = null;
  private _album: Album = null;
  private _artworkUri: string = null;

  constructor(private _init: TrackInit = {
    id: null,
    date_added: null,
    name: null,
    artistIds: null,
    albumId: null
  }) {}

  get id(): string {
    return this._init.id; }

  get date_added(): string {
    return new Date(this._init.date_added).toISOString(); }

  get name(): string {
    return this._init.name; }

  get artistIds(): string[] {
    return this._init.artistIds; }

  get albumId(): string {
    return this._init.albumId; }


  set artworkUri(u: string) { this._artworkUri = u; }
  get artworkUri(): string {
    return this._artworkUri; }


  get artist(): Artist {
    return this._artist; }

  get album(): Album {
    return this._album; }

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
