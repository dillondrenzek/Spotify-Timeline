import { Component, Input } from '@angular/core';

declare var localStorage: any;

export interface UserProfileObject {
	display_name: string,
	id: string,
	email: string,
	external_urls: any,
	href: string,
	images: any,
	country: string
}

@Component({
	selector: 'user-profile',
	templateUrl: 'app/components/user-profile.html',
	styleUrls: ['built/css/components/user-profile.css']
})
export class UserProfile {

	@Input() user: UserProfileObject;

	

}
