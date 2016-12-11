import { Injectable } from '@angular/core';
import * as Spotify from 'spotify-api/types';

const SPOTIFY_TOKEN = 'SPOTIFY_TOKEN';

@Injectable()
export class AuthService {
  constructor() {  }

  

  //------------------------------------------------------------------------
  // SpotifyToken Management
  //------------------------------------------------------------------------

  getSpotifyToken(): Spotify.SpotifyToken { return this.getCachedToken(); }

  setSpotifyToken(token: Spotify.SpotifyToken) { this.setCachedToken(token); }

  ///////////////////////////////
  // SpotifyToken LocalStorage //
  ///////////////////////////////

  private setCachedToken(token: Spotify.SpotifyToken) {
    localStorage.setItem(SPOTIFY_TOKEN, JSON.stringify(token));
  }

  private getCachedToken(): Spotify.SpotifyToken {
    return JSON.parse(localStorage.getItem(SPOTIFY_TOKEN));
  }

  private clearCachedToken() {
    localStorage.removeItem(SPOTIFY_TOKEN);
  }

}
