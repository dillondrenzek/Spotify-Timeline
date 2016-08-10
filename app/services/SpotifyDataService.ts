import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, UserProfileObject } from '../models/User';


declare var localStorage: any;

// export interface SessionToken {
// 	access: string,
// 	refresh: string
// };


@Injectable()
export class SpotifyDataService {

	constructor(private _http: Http) {
		
	}

}
