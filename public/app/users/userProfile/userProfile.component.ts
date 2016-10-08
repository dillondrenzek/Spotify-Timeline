import { Component, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subscriber} from 'rxjs/Rx';

import { UserService }        from '../userService/user.service';
import { UserSessionToken }   from '../userSession/userSession.token';
import { User }               from '../user/User';

@Component({
	selector: 'user-profile',
	moduleId: module.id,
	templateUrl: './userProfile.component.html',
	styleUrls: ['./userProfile.component.css']
})
export class UserProfile {

}
