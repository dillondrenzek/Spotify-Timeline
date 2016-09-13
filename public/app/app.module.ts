// External modules
import { NgModule } 				from '@angular/core';
import { RouterModule } 			from '@angular/router';
import { BrowserModule } 			from '@angular/platform-browser';
import { HttpModule } 				from '@angular/http';

// Internal modules
import { CommonPipesModule }		from './commonPipes/commonPipes.module';
import { UsersModule } 				from './users/users.module';
import { PlaylistsModule } 			from './playlists/playlists.module';

import { App } 						from './App';

import { appRoutes } 				from './app.routes';

import { ArtistComponent } 			from './components/artist.component';
import { AlbumComponent } 			from './components/album.component';
import { NowPlaying } 				from './components/nowPlaying.component';


// Services
import { SpotifyDataService } 		from './services/SpotifyDataService';



@NgModule({
	declarations: [
		App,
		ArtistComponent,
		AlbumComponent,
		NowPlaying
	],
	providers: [
		SpotifyDataService
	],
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		UsersModule,
		PlaylistsModule,
		CommonPipesModule
	],
	bootstrap: [ App ]
})
export class AppModule {}
