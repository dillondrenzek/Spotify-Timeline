import { provideRouter, RouterConfig } from '@angular/router';

import { UserProfile } from './components/UserProfile';
import { SpotifyLogin } from './components/SpotifyLogin';

const routes: RouterConfig = [
	{ path: 'me/:query', component: UserProfile },
	{ path: 'me', component: UserProfile },
	{ path: '', component: SpotifyLogin }
];

export const appRouterProviders = [
	provideRouter(routes)
];
