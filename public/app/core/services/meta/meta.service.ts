import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MetaService {

  constructor(private http: Http) {}

  getAppVersion(): Observable<string> {
    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: '/meta/version'
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let packageObj = res.json();
        return packageObj['version'];
      });
  }

}
