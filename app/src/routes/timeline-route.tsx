import React, { useEffect } from 'react';
import { Typography, Stack, Container, Paper, Card } from '@mui/material';
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
      <Container sx={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Stack
          direction="column"
          sx={{ height: '100%', overflow: 'auto', flex: '10 0 33%', mr: 3 }}
          spacing={3}
        >
          <Paper elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Typography variant="h4" mb={2}>
              Playlists
            </Typography>
            <Typography variant="caption">
              To delete a playlist you've created, you must delete in the
              Spotify app.
            </Typography>
          </Paper>
          <Paper elevation={3}>
            <PlaylistList playlists={playlists} />
          </Paper>
        </Stack>
        <Stack
          direction="column"
          sx={{ height: '100%', overflow: 'auto', flex: '12 0 66%' }}
          spacing={3}
        >
          <Paper elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Typography variant="h4">Timeline</Typography>
            {!isLoaded && (
              <Typography variant="h6">Generating timeline</Typography>
            )}
            {isLoaded && !suggestedPlaylists?.length && (
              <Typography variant="h6">No timeline was generated</Typography>
            )}
          </Paper>

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
