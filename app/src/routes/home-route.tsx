import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { BaseRoute } from './base-route';

export function HomeRoute() {
  const { playlists } = useUserPlaylists();
  return (
    <BaseRoute>
      <Stack direction="row" sx={{ mt: 6, mb: 12 }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h4">Playlists</Typography>
          <PlaylistList playlists={playlists} />
        </Box>
        <Box sx={{ flex: '5' }}>
          <Typography variant="h4">Saved Tracks</Typography>
          <SavedTracksTable />
        </Box>
      </Stack>
    </BaseRoute>
  );
}
