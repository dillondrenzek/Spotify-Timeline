import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserSession } from '../userSession/userSession';

@Injectable()
export class UserGuard implements CanActivate {

  constructor( private userSession: UserSession,
    private router: Router ) {}

  canActivate(): boolean {
    if (this.userSession.valid) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
