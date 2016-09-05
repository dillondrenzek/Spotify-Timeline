import { Pipe } from '@angular/core';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
	'name': 'embed_uri'
})
export class EmbedUriPipe {

	constructor(private sanitizer: DomSanitizer) {}

	transform(v: string, args: any[]){
		let url = 'https://embed.spotify.com/?uri=' + encodeURIComponent(v);
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
