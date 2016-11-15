import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { User } from '../user/User';
import { UserSessionToken } from './userSession.token';



@Injectable()
export class UserSession {

  static session: UserSession = null;

  token: UserSessionToken = new UserSessionToken(null, null);

  constructor() {
    // Get persisted user tokens
    this.token = this.initialUserSessionToken();
  }

  get valid(): boolean {
    return this.token.valid;
  }

  /**
   *
   */
  end() {
    this.token = null;
    this.clearLocalStorageToken();
  }

  ////////////////////////
  // User Session Token //
  ////////////////////////

  /**
   * Set the current user's session token
   */
  setUserSessionToken(queryToken: UserSessionToken) {
    console.info('Set user session token:', queryToken);
    // set token
		this.token = queryToken;
    // set localstorage
    this.setLocalStorageToken(this.token);
	}

  /**
   * Returns the current user's session token
   */
  getUserSessionToken(): UserSessionToken {
    return (this.token.valid)
      ? this.token
      : this.initialUserSessionToken();
	}

  /**
   * Attempt to retrieve persisted token values on startup
   */
  initialUserSessionToken() {
    this.token = this.getLocalStorageToken();
    this.logInitialSessionToken(this.token);
    return this.token;
  }


  /**
   * LOCAL STORAGE
   */
  private setLocalStorageToken(token: UserSessionToken) {
    // if token isn't null
    if (token && token.valid) {
      // set localStorage
      localStorage.setItem(UserSessionToken.access_token_key, token.access);
      localStorage.setItem(UserSessionToken.refresh_token_key, token.refresh);
    } else {
      this.clearLocalStorageToken();
    }
  }

  private getLocalStorageToken(): UserSessionToken {
    // retrieve from LocalStorage
    let access_token = localStorage.getItem( UserSessionToken.access_token_key);
    let refresh_token = localStorage.getItem( UserSessionToken.refresh_token_key);
    return new UserSessionToken(access_token, refresh_token);
  }

  private clearLocalStorageToken() {
    // remove localstorage
    console.info('remove localStorage user session token keys')
    localStorage.removeItem( UserSessionToken.access_token_key );
    localStorage.removeItem( UserSessionToken.refresh_token_key );
  }

  /**
   * Log status
   */
  private logInitialSessionToken(token: UserSessionToken) {
    let status = (this.token.valid) ? 'exists.' : 'does not exist.';
    console.info('Initial UserSessionToken', status);
  }
}
