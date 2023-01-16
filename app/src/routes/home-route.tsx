import React from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { BaseRoute } from './base-route';
import { Nav } from '../app/Nav';
import { Playbar } from '../app/playbar';

export function HomeRoute() {
  const { playlists } = useUserPlaylists();
  return (
    <BaseRoute hideNav hidePlaybar>
      <Stack direction="column" sx={{ height: '100vh' }}>
        <Nav />
        <Stack
          direction="row"
          alignItems="stretch"
          sx={{ height: '100%', mt: 6, mb: 12 }}
        >
          <Box sx={{ height: '100%', flex: '1', overflow: 'auto' }}>
            <Typography variant="h4">Playlists</Typography>
            <PlaylistList playlists={playlists} />
          </Box>
          <Box sx={{ height: '100%', flex: '5', overflow: 'auto' }}>
            <Typography variant="h4">Saved Tracks</Typography>
            <SavedTracksTable />
          </Box>
        </Stack>
        <Playbar />
      </Stack>
    </BaseRoute>
  );
}
