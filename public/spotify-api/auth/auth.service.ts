import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Spotify from 'spotify-api/types';

import {
  CLIENT_ID,
  REDIRECT_URI
} from './auth.tokens';

const SPOTIFY_TOKEN = 'SPOTIFY_TOKEN';

@Injectable()
export class AuthService {




  constructor(
    @Inject(CLIENT_ID) private clientId,
    @Inject(REDIRECT_URI) private redirectUri,
  ) {  }

  login(token: Spotify.SpotifyToken) {

    let cachedToken = this.getSpotifyToken();

    if (!cachedToken) {
      this.redirectToSpotifyLogin();
    }

  }

  /**
   * Redirects client to Spotify's login URL to gain access to user's account
   */
  private redirectToSpotifyLogin() {
    window.location.href = this.getLoginUrl();
  }

  /**
   * Builds and returns the URL used to acquire the spotify API token
   */
  private getLoginUrl(): string {

    let scopes = [
			'playlist-modify-public',
			'playlist-modify-private',
			'streaming',
			'user-library-read',
			'user-library-modify',
			'user-read-birthdate',
			'user-top-read'
		];

    return 'https://accounts.spotify.com/authorize?client_id=' + this.clientId
				+ '&redirect_uri=' + encodeURIComponent(this.redirectUri)
				+ '&scope=' + encodeURIComponent(scopes.join(' '))
				+ '&response_type=token';

  }

  //------------------------------------------------------------------------
  // SpotifyToken Management
  //------------------------------------------------------------------------

  getSpotifyToken(): Spotify.SpotifyToken { return this.getCachedToken() || null; }

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
