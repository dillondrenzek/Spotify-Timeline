import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserProfile } from './components/profile/UserProfile';
import { SpotifyUserService } from './spotify/spotifyUser.service';

import { usersRoutes } from './users.routes';

export { UserProfile } from './components/profile/UserProfile';
export { SpotifyUserService } from './spotify/spotifyUser.service';
export { User } from './models/User';

@NgModule({
	declarations: [
		UserProfile
	],
	providers: [
		SpotifyUserService
	],
	imports: [
		CommonModule,
		RouterModule.forChild(usersRoutes)
	]
})
export class UsersModule {}
