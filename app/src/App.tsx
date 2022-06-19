import React from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Stack,
  ListItemButton,
} from '@mui/material';
import { Nav } from './app/Nav';
import { SavedTracksTable } from './app/saved-tracks-table';
import { useUserPlaylists } from './hooks/use-user-playlists';

function App() {
  const { playlists: userPlaylists } = useUserPlaylists();

  return (
    <>
      <CssBaseline />
      {/* <Container> */}
      <Nav />
      <Stack direction="row" sx={{ mt: 8 }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h4">Playlists</Typography>
          <List>
            {userPlaylists.map((playlist) => (
              <ListItem>
                <ListItemButton>
                  <ListItemText primary={playlist.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: '5' }}>
          <Typography variant="h4">Saved Tracks</Typography>
          <SavedTracksTable />
        </Box>
      </Stack>
      {/* </Container> */}
    </>
  );
}

export default App;
