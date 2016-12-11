import * as Spotify from 'spotify-api/types';
import { Track } from '../Track';


/**
 * SpotifyTrackObject to Track
 */
export function convertSpotifyTrack(spotifyTrack: Spotify.SavedTrack): Track {
  return new Track({
    id:         spotifyTrack.track.id,
    date_added: spotifyTrack.added_at,
    name:       spotifyTrack.track.name,
    artistIds:  spotifyTrack.track.artists.map(artist => artist.id),
    albumId:    spotifyTrack.track.album.id
  });
}
