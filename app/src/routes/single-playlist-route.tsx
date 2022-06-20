import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { useTracksForPlaylist } from '../hooks/use-tracks-for-playlist';

import { BaseRoute } from './base-route';

export function SinglePlaylistRoute() {
  const { playlists } = useUserPlaylists();
  const params = useParams();

  const playlistId = params['id'] ?? null;

  const currentPlaylist = useMemo(() => {
    if (!playlistId) {
      return null;
    }
    return playlists.find((p) => p.id === playlistId) ?? null;
  }, [playlists, playlistId]);

  const playlistItems = useTracksForPlaylist(playlistId);

  return (
    <BaseRoute>
      <Stack direction="row" sx={{ mt: 8 }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h4">Playlists</Typography>
          <PlaylistList playlists={playlists} />
        </Box>
        <Box sx={{ flex: '5' }}>
          <Typography variant="h4">{currentPlaylist?.name}</Typography>
          <Typography variant="body1">
            {JSON.stringify(playlistItems)}
          </Typography>
        </Box>
      </Stack>
    </BaseRoute>
  );
}
