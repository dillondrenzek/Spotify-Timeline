import { Component } from '@angular/core';


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

	user: UserProfileObject = {
		display_name: 'display_name',
		id: 'id',
		email: 'email',
		external_urls: {
			spotify: 'external_urls.spotify'
		},
		href: 'href',
		images: [{url: 'images[0].url'}],
		country: 'country'
	}

}
