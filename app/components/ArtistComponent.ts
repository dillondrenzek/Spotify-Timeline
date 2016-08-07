import { Component, Input } from '@angular/core';

import { Artist } from '../models/Artist';

@Component({
	selector: 'artist',
	templateUrl: 'app/components/artist-component.html',
	styleUrls: ['built/css/components/artist-component.html']
})

export class ArtistComponent {

	@Input() artist: Artist;

	constructor() {}

	ngOnInit() {}
}
