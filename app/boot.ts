import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { appRouterProviders } from './app.routes';
import { App } from './App';

bootstrap(App, [
	HTTP_PROVIDERS,
	appRouterProviders
]);
