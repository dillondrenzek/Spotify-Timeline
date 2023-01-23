import React from 'react';
import { Box, Typography, Stack, Card, Container, Button } from '@mui/material';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { BaseRoute } from './base-route';
import { blueGrey } from '@mui/material/colors';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { useAuthToken } from '../hooks/use-auth-token';
import { AuthLinks } from '../lib/auth';

export function HomeRoute() {
  const { playlists } = useUserPlaylistsStore();

  const { authToken } = useAuthToken();

  return (
    <BaseRoute hidePlaybar={!authToken} hideNav={!authToken}>
      {authToken ? (
        <Card sx={{ height: '100%' }}>
          <Stack direction="row" alignItems="stretch" sx={{ height: '100%' }}>
            <Box
              sx={{
                height: '100%',
                flex: '1',
                overflow: 'auto',
                background: blueGrey[100],
              }}
            >
              <Typography variant="h4">Playlists</Typography>
              <PlaylistList playlists={playlists} />
            </Box>
            <Box sx={{ height: '100%', flex: '5', overflow: 'auto' }}>
              <Typography variant="h4">Saved Tracks</Typography>
              <SavedTracksTable />
            </Box>
          </Stack>
        </Card>
      ) : (
        <Container fixed>
          <Card sx={{ my: 3, p: 3 }}>
            <Stack direction="column" spacing={3} textAlign="center">
              <Typography variant="h2">Spotify Timeline</Typography>
              <Typography variant="body1">
                Using your Spotify Account, Spotify Timeline will suggest
                playlists from your Liked Songs based on when they were added.
                This gives you the ability to create playlists that represent a
                time period in your life!
              </Typography>
              <Button href={AuthLinks.login}>Login with Spotify</Button>
            </Stack>
          </Card>
        </Container>
      )}
    </BaseRoute>
  );
}
