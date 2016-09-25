import { Injectable } from '@angular/core';

export class SessionToken {
  constructor(
    public access: string,
	  public refresh: string
  ) {}
}

@Injectable()
export class UserService {

  sessionToken: SessionToken;

  access_token: string;
  private_token: string;

  setSessionToken(queryToken: SessionToken) {
		this.sessionToken = queryToken;
		// localStorage.setItem(this.access_token_key, this.sessionTokens.access);
		// localStorage.setItem(this.refresh_token_key, this.sessionTokens.refresh);
	}

  getSessionToken(): SessionToken {
		// let token: SessionToken = {access: null, refresh: null};
		// if (!this.sessionToken) {
		// 	token = {
		// 		// access: localStorage.getItem(this.access_token_key),
		// 		// refresh: localStorage.getItem(this.refresh_token_key)
		// 	};
		// } else {
			// token = ;
		// }
		// console.warn('getSessionTokens', token);
		return this.sessionToken;
	}

}
