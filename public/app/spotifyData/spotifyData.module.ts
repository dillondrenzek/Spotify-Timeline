// External Modules
import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { RouterModule } 			from '@angular/router';

// Internal Modules
import { TracksModule }				from './tracks/tracks.module';
import { PlaylistsModule } 			from './playlists/playlists.module';
import { ArtistsModule }			from './artists/artists.module';
import { AlbumsModule }				from './albums/albums.module';
import { UsersModule }				from './users/users.module';

// Services
import { SpotifyDataService }		from './services/spotifyData.service';
import { SpotifyUserService }		from './services/spotifyUser.service';

//----------
// Exports
//----------

// Internal Modules

// Services
export { SpotifyDataService }		from './services/spotifyData.service';
export { SpotifyUserService }		from './services/spotifyUser.service';



@NgModule({
	imports: [
		CommonModule,

		TracksModule,
		PlaylistsModule,
		ArtistsModule,
		AlbumsModule,
		UsersModule
	],
	providers: [
		SpotifyDataService,
		SpotifyUserService
	]
})
export class SpotifyDataModule {}
