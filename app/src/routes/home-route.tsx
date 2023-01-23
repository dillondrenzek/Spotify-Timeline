import React from 'react';
import {
  Typography,
  Stack,
  Card,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { SavedTracksTable } from '../app/saved-tracks-table';
import { PlaylistList } from '../app/playlist-list';
import { BaseRoute } from './base-route';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { useAuthToken } from '../hooks/use-auth-token';
import { AuthLinks } from '../lib/auth';

export function HomeRoute() {
  const { playlists } = useUserPlaylistsStore();

  const { authToken } = useAuthToken();

  return (
    <BaseRoute hidePlaybar={!authToken} hideNav={!authToken}>
      {authToken ? (
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
      ) : (
        <Container fixed>
          <Card sx={{ my: 3, p: 3 }}>
            <Stack
              direction="column"
              spacing={3}
              textAlign="center"
              alignItems="center"
            >
              <Typography variant="h2">Spotify Timeline</Typography>
              <Typography variant="body1" sx={{ width: '50%' }}>
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
