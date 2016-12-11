import { SpotifyArtistObject } from '@timeline/spotify-api';
import { Artist } from '../Artist';


/**
 * SpotifyArtistObject to Artist
 */
export function convertSpotifyArtist(spotifyArtist: SpotifyArtistObject): Artist {
  return new Artist({
    id:         spotifyArtist.id,
    name:       spotifyArtist.name,
    genres:     spotifyArtist.genres
  });
}
