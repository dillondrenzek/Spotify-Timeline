import { provideRouter, RouterConfig } from '@angular/router';

import { NowPlaying } 	from './components/NowPlaying';
import { UserProfile } 	from './components/UserProfile';

const routes: RouterConfig = [

	{ path: 'play/:id', component: NowPlaying },
	{ path: 'play', component: NowPlaying },
	{ path: 'me/:query', component: UserProfile },
	{ path: 'me', component: UserProfile },
	{ path: '', component: NowPlaying }
];

export const appRouterProviders = [
	provideRouter(routes)
];
