import React, { PropsWithChildren, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Box, Typography, CssBaseline, Stack } from '@mui/material';
import { Nav } from '../app/Nav';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { useTracksForPlaylist } from '../hooks/use-tracks-for-playlist';

import { BaseRoute } from './base-route';

export function HomeRoute() {
  const { playlists } = useUserPlaylists();
  return (
    <BaseRoute>
      <Stack direction="row" sx={{ mt: 8 }}>
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
