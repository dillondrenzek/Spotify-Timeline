import React from 'react';
import { Box, Typography, CssBaseline, Stack } from '@mui/material';
import { Nav } from './app/Nav';
import { SavedTracksTable } from './app/saved-tracks-table';
import { PlaylistList } from './app/playlist-list';

function App() {
  return (
    <>
      <CssBaseline />
      <Nav />
      <Stack direction="row" sx={{ mt: 8 }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h4">Playlists</Typography>
          <PlaylistList />
        </Box>
        <Box sx={{ flex: '5' }}>
          <Typography variant="h4">Saved Tracks</Typography>
          <SavedTracksTable />
        </Box>
      </Stack>
    </>
  );
}

export default App;
