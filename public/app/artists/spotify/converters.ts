import * as Spotify from 'spotify-api/types';
import { Artist } from '../Artist';


/**
 * SpotifyArtistObject to Artist
 */
export function convertSpotifyArtist(spotifyArtist: Spotify.Artist): Artist {
  return new Artist({
    id:         spotifyArtist.id,
    name:       spotifyArtist.name,
    genres:     spotifyArtist.genres
  });
}
