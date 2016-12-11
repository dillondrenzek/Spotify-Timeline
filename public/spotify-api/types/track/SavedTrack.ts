import { Track } from './Track';



export interface SavedTrack {

  // added_at - a timestamp	- The date and time the track was saved.
  added_at: string,

  // track - a track object -	Information about the track.
  track: Track

}
