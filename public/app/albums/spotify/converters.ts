import * as Spotify from 'spotify-api/types';
import { Album } from '../Album';


/**
 * SpotifyAlbumObject to Album
 */
export function convertSpotifyAlbum(spotifyAlbum: Spotify.Album): Album {
  return new Album({
    artworkUri:     spotifyAlbum.images[0].url
  });
}
