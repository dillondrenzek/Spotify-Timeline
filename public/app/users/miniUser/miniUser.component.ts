import { Component } from '@angular/core';

import { User } from '../user/User';
import { UserService } from '../userService/user.service';

@Component({
  moduleId: module.id,
  selector: 'mini-user',
  templateUrl: './miniUser.component.html',
  styleUrls: ['./miniUser.component.css']
})
export class MiniUser {

  private _user: User = null;

  constructor( private userService: UserService ) {
    this.userService.currentUser$.subscribe(
      (user: User) => this.userChanged(user));
  }

  userChanged(newUser: User) {
    console.info('MiniUser: userChanged:', newUser);
    this._user = newUser;
  }
}
