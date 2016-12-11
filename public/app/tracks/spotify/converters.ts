import { SpotifySavedTrackObject } from '@timeline/spotify-api';
import { Track } from '../Track';


/**
 * SpotifyTrackObject to Track
 */
export function convertSpotifyTrack(spotifyTrack: SpotifySavedTrackObject): Track {
  return new Track({
    id:         spotifyTrack.track.id,
    added_at:   spotifyTrack.added_at,
    name:       spotifyTrack.track.name,
    artists:    spotifyTrack.track.artists
  });
}
