// External modules
import { NgModule } 				from '@angular/core';
import { RouterModule } 			from '@angular/router';
import { BrowserModule } 			from '@angular/platform-browser';
import { HttpModule } 				from '@angular/http';

// Internal modules
import { CommonPipesModule }		from './commonPipes/commonPipes.module';
import { SpotifyDataModule } 		from './spotifyData/spotifyData.module';
import { UsersModule } 				from './users/users.module';

// Routes
import { appRoutes } 				from './app.routes';

// Components
import { App } 						from './App';
import { NowPlaying } 				from './components/nowPlaying.component';




@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		CommonPipesModule,
		SpotifyDataModule,
		UsersModule
	],
	declarations: [
		App,
		NowPlaying
	],
	bootstrap: [ App ]
})
export class AppModule {}
