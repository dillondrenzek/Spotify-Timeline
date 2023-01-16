import React from 'react';
import { Box, Typography, Stack, Card } from '@mui/material';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { BaseRoute } from './base-route';

export function HomeRoute() {
  const { playlists } = useUserPlaylists();
  return (
    <BaseRoute>
      <Card sx={{ height: '100%' }}>
        <Stack direction="row" alignItems="stretch" sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', flex: '1', overflow: 'auto' }}>
            <Typography variant="h4">Playlists</Typography>
            <PlaylistList playlists={playlists} />
          </Box>
          <Box sx={{ height: '100%', flex: '5', overflow: 'auto' }}>
            <Typography variant="h4">Saved Tracks</Typography>
            <SavedTracksTable />
          </Box>
        </Stack>
      </Card>
    </BaseRoute>
  );
}
