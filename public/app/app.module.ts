import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { App } from './App';

import { appRoutes } from './app.routes';

import { ArtistComponent } from './components/ArtistComponent';
import { AlbumComponent } from './components/AlbumComponent';
import { PlaylistListItem } from './components/playlists/list-item/PlaylistListItem.component';
import { PlaylistPageComponent } from './components/playlists/page/PlaylistPage.component';
import { NowPlaying } from './components/NowPlaying';

// Pipes
import { DurationPipe } from './pipes/DurationPipe';
import { EmbedUriPipe } from './pipes/EmbedUriPipe';

// Services
import { SpotifyDataService } from './services/SpotifyDataService';
// import { SpotifyUserService } from './services/SpotifyUserService';

import { UsersModule } from './users/users.module';

@NgModule({
	declarations: [
		App,
		DurationPipe,
		EmbedUriPipe,
		ArtistComponent,
		AlbumComponent,
		PlaylistPageComponent,
		PlaylistListItem,
		NowPlaying
	],
	providers: [
		SpotifyDataService
	],
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		UsersModule
	],
	bootstrap: [ App ]
})
export class AppModule {}
