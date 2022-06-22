import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { useTracksForPlaylist } from '../hooks/use-tracks-for-playlist';
import { BaseRoute } from './base-route';
import { TracksTable } from '../app/tracks-table';
import { useSpotifyPlayer } from '../hooks/use-spotify-player';

export function SinglePlaylistRoute() {
  const { playlists } = useUserPlaylists();

  const params = useParams();
  const playlistId = params['id'] ?? null;

  const currentPlaylist = useMemo(() => {
    if (!playlistId) {
      return null;
    }
    return playlists.find((p) => p.id === playlistId) ?? null;
  }, [playlists, playlistId]);

  const { tracks } = useTracksForPlaylist(playlistId);

  const playlistUri = currentPlaylist?.uri;

  const { play } = useSpotifyPlayer();

  const handleClickPlay = useCallback(() => {
    if (!playlistUri) {
      return;
    }
    play(null, playlistUri);
    console.log('play', null, playlistUri);
  }, [play, playlistUri]);

  return (
    <BaseRoute>
      <Box sx={{ pt: 8, height: '100vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4">Playlists</Typography>
            <PlaylistList playlists={playlists} />
          </Grid>
          <Grid item xs={9}>
            <Box>
              <Typography variant="h4">{currentPlaylist?.name}</Typography>
              <Button onClick={handleClickPlay}>Play Playlist</Button>
            </Box>
            <TracksTable tracks={tracks} contextUri={playlistUri} />
          </Grid>
        </Grid>
      </Box>
    </BaseRoute>
  );
}
