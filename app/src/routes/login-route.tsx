import React from 'react';
import { Typography, Stack, Card, Container, Button } from '@mui/material';
import { BaseRoute } from './base-route';
import { useAuthToken } from '../hooks/use-auth-token';
import { AuthLinks } from '../lib/auth';

export function LoginRoute() {
  const { authToken } = useAuthToken();

  return (
    <BaseRoute hidePlaybar={!authToken} hideNav={!authToken}>
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
    </BaseRoute>
  );
}
