import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserSession } from '../userSession/userSession';
import { UserService } from '../userService/user.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.userService.currentUserExists()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
