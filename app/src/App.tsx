import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Box, Typography, CssBaseline, Stack } from '@mui/material';
import { Nav } from './app/Nav';
import { SavedTracksTable } from './app/saved-tracks-table';
import { PlaylistList } from './app/playlist-list';
import { useUserPlaylists } from './hooks/use-user-playlists';

function SinglePlaylistRoute() {
  const { playlists } = useUserPlaylists();
  const params = useParams();

  const playlistId = params['id'] ?? null;

  const currentPlaylist = useMemo(() => {
    return playlists.find((p) => p.id === playlistId);
  }, [playlists, playlistId]);

  return (
    <>
      <CssBaseline />
      <Nav />
      <Stack direction="row" sx={{ mt: 8 }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h4">Playlists</Typography>
          <PlaylistList playlists={playlists} />
        </Box>
        <Box sx={{ flex: '5' }}>
          <Typography variant="h4">{currentPlaylist?.name}</Typography>
          <Typography variant="body1">
            {JSON.stringify(currentPlaylist)}
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

function HomeRoute() {
  const { playlists } = useUserPlaylists();
  return (
    <>
      <CssBaseline />
      <Nav />
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="playlists">
          <Route path=":id" element={<SinglePlaylistRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
