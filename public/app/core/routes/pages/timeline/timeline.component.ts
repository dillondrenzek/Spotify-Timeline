import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class Timeline {

  mockTracks = [];
  addedTracks = [];

  timelineGeneratedKey = 'timeline-generated';

  get generated(): boolean {
    let value = localStorage.getItem(this.timelineGeneratedKey);
    return (value === 'true');
  }

  getTracks() {
    if (!this.mockTracks.length) this.seedTracks();

    if (!this.generated) localStorage.setItem(this.timelineGeneratedKey, 'true');
  }

  clearTracks() {
    this.mockTracks = [];
    localStorage.removeItem(this.timelineGeneratedKey);
  }

  seedTracks() {
    let seedTrack = {
      name: 'Track',
      artist: 'Artist',
      dateAdded: 'July 27'
    };

    for ( var i = 0; i < 20; i++ ) {
      this.mockTracks.push({
        name: seedTrack.name + i,
        artist: seedTrack.artist + i,
        dateAdded: seedTrack.dateAdded
      });
    }
  }

  ngOnInit() {
    this.getTracks();
  }
}
