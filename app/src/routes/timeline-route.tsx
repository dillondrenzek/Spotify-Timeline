import React, { useEffect } from 'react';
import { Typography, Stack, Container, Paper } from '@mui/material';
import { BaseRoute } from './base-route';
import { useTimelineStore } from '../stores/use-timeline-store';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { TimelineSuggestedPlaylist } from '../app/timeline-suggested-playlist';

export function TimelineRoute() {
  const { timeline, generateTimeline, isLoaded } = useTimelineStore();
  const { playlists, pullUserPlaylists } = useUserPlaylistsStore();

  const { suggestedPlaylists } = timeline ?? {};

  useEffect(() => {
    pullUserPlaylists();
    generateTimeline();
  }, [generateTimeline, pullUserPlaylists]);

  return (
    <BaseRoute>
      <Container fixed sx={{ pb: 6, display: 'flex', flexDirection: 'row' }}>
        <Stack direction="column" sx={{ flex: '10 0 33%', mr: 3 }} spacing={3}>
          <Typography variant="h4">Playlists</Typography>
          <Paper elevation={3}>
            <PlaylistList playlists={playlists} />
          </Paper>
        </Stack>
        <Stack direction="column" sx={{ flex: '12 0 66%' }} spacing={3}>
          <Typography variant="h4">Timeline</Typography>

          {!isLoaded && (
            <Typography variant="h6">Generating timeline</Typography>
          )}
          {isLoaded && !suggestedPlaylists?.length && (
            <Typography variant="h6">No timeline was generated</Typography>
          )}
          {suggestedPlaylists?.map((playlist, j) => (
            <Paper elevation={3} key={j.toString()}>
              <TimelineSuggestedPlaylist playlist={playlist} />
            </Paper>
          ))}
        </Stack>
      </Container>
    </BaseRoute>
  );
}
