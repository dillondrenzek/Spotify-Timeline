import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { App } from './App';

import { appRoutes } from './app.routes';

import { ArtistComponent } from './components/ArtistComponent';
import { AlbumComponent } from './components/AlbumComponent';
import { NowPlaying } from './components/NowPlaying';

// Pipes
import { DurationPipe } from './pipes/DurationPipe';
import { EmbedUriPipe } from './pipes/EmbedUriPipe';

// Services
import { SpotifyDataService } from './services/SpotifyDataService';

import { UsersModule } 				from './users/users.module';
import { PlaylistsModule } 			from './playlists/playlists.module';

@NgModule({
	declarations: [
		App,
		DurationPipe,
		EmbedUriPipe,
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
		PlaylistsModule
	],
	bootstrap: [ App ]
})
export class AppModule {}
