export const ApiUrls = {
  suggestedPlaylists: '/api/suggested-playlists',

  tracksForPlaylistById: (id: string) => `/api/playlists/${id}/tracks`,
  playlists: '/api/playlists',

  player: '/api/player',
  playerPlay: '/api/player/play',
  playerPause: '/api/player/pause',

  mePlayerPlay: '/api/me/player/play',
  mePlayerPause: '/api/me/player/pause',
  mePlayerDevices: '/api/me/player/devices',
  mePlaylists: '/api/me/playlists',
  meTracks: '/api/me/tracks',
  me: '/api/me',
};

export function withParams(
  baseUrl: string,
  params: Record<string, string> = {}
) {
  const searchParams = new URLSearchParams(params);
  return (
    baseUrl +
    (searchParams.entries.length > 0 ? '?' + searchParams.toString() : null)
  );
}
