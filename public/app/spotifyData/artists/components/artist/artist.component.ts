import { Component, Input } from '@angular/core';

import { Artist } from '../models/Artist';

@Component({
	selector: 'artist',
	moduleId: module.id,
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css']
})

export class ArtistComponent {

	@Input() artist: Artist;

	constructor() {}

	ngOnInit() {}
}
