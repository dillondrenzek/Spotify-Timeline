import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';

import { Track } from './Track';

@Injectable()
export class TracksService {

  constructor( private http: Http ) {  }

  /**
   * Get user tracks
   */
  getTracksWithUserId(id: string, access_token: string): Observable<Track[]> {
 		var req: Request = new Request({
 			method: RequestMethod.Get,
 			url: 'https://api.spotify.com/v1/users/'+id+'/tracks',
 			headers: new Headers({
 				'Authorization': 'Bearer ' + access_token
 			})
 		});

 		return this.http
 			.request(req)
      .map((res: Response) => {
        let retArray = [];
        let items = res.json()['items'];
        for (var i = 0; i < items.length; i++) {
          let item = items[i];
          let track = new Track(item['track']);
          // console.info('item', item);
          // console.info('track', track);
          track['dateAdded'] = item['added_at'];
          retArray.push(track);
        }
        return retArray;
      });
 	}

}
