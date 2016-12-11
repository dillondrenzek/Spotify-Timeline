import { SpotifyAlbumObject } from '@timeline/spotify-api';
import { Album } from '../Album';


/**
 * SpotifyAlbumObject to Album
 */
export function convertSpotifyAlbum(spotifyAlbum: SpotifyAlbumObject): Album {
  return new Album({
    id:         spotifyAlbum.id,
    name:       spotifyAlbum.name,
    genres:     spotifyAlbum.genres,
    images:     spotifyAlbum.images
  });
}
