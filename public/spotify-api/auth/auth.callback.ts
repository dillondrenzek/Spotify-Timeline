import { Component } from '@angular/core';
import { Router,
  ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

import { SpotifyApiService } from 'spotify-api/index';
import * as Spotify from 'spotify-api/types';



@Component({
	selector: '',
	moduleId: module.id,
	template: `Redirecting...`
})
export class AuthCallback {

	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService,
    private auth: AuthService
	) {

    // Spotify passes access_token back through fragment
    this.route.fragment.subscribe(
      (fragment: string) => this.fragmentChanged(fragment));
  }


  /**
   * Handles parsing token info passed back by Spotify via URL Fragment
   */
  private fragmentChanged(fragment: string) {

    let token = this.parseFragment(fragment);

    this.auth.setSpotifyToken(token);

    this.router.navigate(['/']);

  }


  /**
   * Parses a Url fragment expected to be in the shape of:
   *    {key1}={value1}&{key2}={value2}
   */
  private parseFragment(fragment: string): Spotify.SpotifyToken {

    let token: Spotify.SpotifyToken = {
      access_token: null,
      token_type: null,
      expires_in: null
    };

    let keyValues: string[] = fragment.split('&');

    for (let i = 0; i < keyValues.length; i++) {
      let keyValue = keyValues[i];
      let splitString = keyValue.split('=');

      token[splitString[0]] = splitString[1];
    }

    // Throw error if invalid token is parsed
    if (!Spotify.isValidSpotifyToken(token)) this.invalidSpotifyToken(token);

    return token;
  }



  private invalidSpotifyToken(token: any) {
    throw new Error('An invalid Spotify token was parsed from the URL fragment:' + JSON.stringify(token));
  }
}
