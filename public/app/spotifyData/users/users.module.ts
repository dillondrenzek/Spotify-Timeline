import { NgModule } 			from '@angular/core';
import { RouterModule } 		from '@angular/router';
import { CommonModule } 		from '@angular/common';

import { usersRoutes } 			from './users.routes';

import { UserProfile } 			from './components/profile/UserProfile';

import { SpotifyUserService } 	from './services/spotifyUser.service';

export { UserProfile } 			from './components/profile/UserProfile';
export { SpotifyUserService } 	from './services/spotifyUser.service';
export { User } 				from './models/User';



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(usersRoutes)
	],
	declarations: [
		UserProfile
	],
	exports: [
		UserProfile
	],
	providers: [
		SpotifyUserService
	]
})
export class UsersModule {}
