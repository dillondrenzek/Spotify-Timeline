import { NgModule } 				from '@angular/core';
import { CommonModule } 			from '@angular/common';
import { RouterModule } 			from '@angular/router';

// Tracks
import { TracksModule }				from './tracks/tracks.module';

// Playlists
import { PlaylistsModule } 			from './playlists/playlists.module';

// Artists
import { ArtistsModule }			from './artists/artists.module';

// import { tracksRoutes } 			from './tracks.routes';
//
// import { TrackComponent } 			from './components/track/track.component';
// import { TracksListComponent } 		from './components/tracksList/tracksList.component';
//
// export { TrackComponent } 			from './components/track/track.component';
// export { TracksListComponent } 		from './components/tracksList/tracksList.component';
// export { Track } 					from './models/Track';



@NgModule({
	imports: [
		CommonModule,
		// RouterModule.forChild(tracksRoutes),
		TracksModule
	],
	declarations: [
		// TrackComponent,
		// TracksListComponent
	],
	exports: [
		// TrackComponent,
		// TracksListComponent
	]
})
export class SpotifyDataModule {}
