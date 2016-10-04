import { Component } from '@angular/core';

import { User, UserService } from '@timeline/users';

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

  constructor( private userService: UserService ){

    this.userService.currentUser$.subscribe(
      (user: User) => {
        // this.getTracks();
      }
    );

  }

  get generated(): boolean {
    let value = localStorage.getItem(this.timelineGeneratedKey);
    return (value === 'true');
  }



  getTracks() {
    if (!this.mockTracks.length) {
      this.userService.getTracks().subscribe(
        (tracks: any[]) => {
          this.mockTracks = tracks;
        });
    }
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
    // this.getTracks();
  }
}
