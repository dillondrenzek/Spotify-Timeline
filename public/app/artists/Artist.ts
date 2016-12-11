export class Artist {

  private _id: string = null;
  private _name: string = null;
  private _genres: string[] = null;

  constructor(obj = {}) {

    this._id = obj['id'];
    this._name = obj['name'];
    this._genres = obj['genres'];
  }

  get id(): string { return this._id; }

  get name(): string { return this._name; }

  get genres(): string[] { return this._genres; }

  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      genres: this.genres
    }
  }
}
