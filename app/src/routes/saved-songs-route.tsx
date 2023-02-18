import React, { useEffect } from 'react';
import { Typography, Stack, Paper } from '@mui/material';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { BaseRoute } from './base-route';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { useUserStore } from '../stores/use-user-store';

export function SavedSongsRoute() {
  const { playlists, pullUserPlaylists } = useUserPlaylistsStore();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    pullUserPlaylists();
  }, [pullUserPlaylists]);

  return (
    <BaseRoute hidePlaybar={!isAuthenticated} hideNav={!isAuthenticated}>
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
          <Paper elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Typography variant="h4">Saved Songs</Typography>
          </Paper>
          <Paper elevation={3}>
            <SavedTracksTable />
          </Paper>
        </Stack>
      </Stack>
    </BaseRoute>
  );
}
