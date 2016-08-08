import { Playlist } from './Playlist';

export interface UserProfileObject {
	display_name: string,
	id: string,
	email: string,
	external_urls: any,
	href: string,
	images: any,
	country: string
}

export class User {

	private upo: UserProfileObject;

	constructor(upo: UserProfileObject) {
		this.upo = upo;
	}

	get display_name(): string {  return this.upo['display_name']; }

	get id(): string { return this.upo['id']; }

	get email(): string { return this.upo['email']; }

	get external_urls(): any { return this.upo['external_urls']; }

	get href(): string { return this.upo['href']; }

	get images(): any { return this.upo['images']; }

	get country(): string { return this.upo['country']; }

	static create(upo?: UserProfileObject) {
		return new User({
			display_name: null,
			id: null,
			email: null,
			external_urls: {spotify: null},
			href: null,
			images: [{url: null}],
			country: null
		})
	}
}
