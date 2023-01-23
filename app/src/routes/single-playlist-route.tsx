import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, Stack } from '@mui/material';
import { PlaylistList } from '../app/playlist-list';
import { useTracksForPlaylist } from '../hooks/use-tracks-for-playlist';
import { BaseRoute } from './base-route';
import { TracksTable } from '../app/tracks-table';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';

export function SinglePlaylistRoute() {
  const { playlists, pullUserPlaylists } = useUserPlaylistsStore();

  const params = useParams();
  const playlistId = params['id'] ?? null;

  const currentPlaylist = useMemo(() => {
    if (!playlistId || !playlists) {
      return null;
    }
    return playlists.find((p) => p.id === playlistId) ?? null;
  }, [playlists, playlistId]);

  const { tracks } = useTracksForPlaylist(playlistId);

  const playlistUri = currentPlaylist?.uri;

  useEffect(() => {
    pullUserPlaylists();
  }, [pullUserPlaylists]);

  return (
    <BaseRoute>
      <Box sx={{ pt: 2, height: '100vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card elevation={3}>
              <Typography variant="h4">Playlists</Typography>
              <PlaylistList playlists={playlists} />
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card elevation={3} sx={{ pb: 8 }}>
              <Stack direction="column" sx={{ p: 3 }} spacing={3}>
                {currentPlaylist?.name && (
                  <Typography variant="h4">{currentPlaylist?.name}</Typography>
                )}
                {currentPlaylist?.description && (
                  <Typography variant="h6">
                    {currentPlaylist?.description}
                  </Typography>
                )}
              </Stack>
              <TracksTable tracks={tracks} contextUri={playlistUri} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </BaseRoute>
  );
}
