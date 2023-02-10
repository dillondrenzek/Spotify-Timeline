import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, Stack, Paper } from '@mui/material';
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
      <Stack direction="row" spacing={3} sx={{ px: 3, height: '100%' }}>
        <Stack
          spacing={3}
          direction={'column'}
          sx={{ height: '100%', overflow: 'auto', flex: '2', py: 2 }}
        >
          <Paper elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Typography variant="h4">Playlists</Typography>
          </Paper>
          <Paper elevation={3}>
            <PlaylistList playlists={playlists} />
          </Paper>
        </Stack>
        <Stack
          direction={'column'}
          spacing={3}
          sx={{ height: '100%', overflow: 'auto', flex: '5', py: 2 }}
        >
          <Card elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Stack direction="column" spacing={3}>
              {currentPlaylist?.name && (
                <Typography variant="h4">{currentPlaylist?.name}</Typography>
              )}
              {currentPlaylist?.description && (
                <Typography variant="h6">
                  {currentPlaylist?.description}
                </Typography>
              )}
            </Stack>
          </Card>
          <Card elevation={3} sx={{ pb: 8 }}>
            <TracksTable tracks={tracks} contextUri={playlistUri} />
          </Card>
        </Stack>
      </Stack>
    </BaseRoute>
  );
}
