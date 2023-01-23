import React, { useEffect } from 'react';
import { Typography, Stack, Paper, Box, Button } from '@mui/material';
import { BaseRoute } from './base-route';
import { useTimelineStore } from '../stores/use-timeline-store';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { TimelineSuggestedPlaylist } from '../app/timeline-suggested-playlist';

export function TimelineRoute() {
  const { timeline, generateTimeline, isLoaded, isLoading } =
    useTimelineStore();
  const { playlists, pullUserPlaylists } = useUserPlaylistsStore();

  const { suggestedPlaylists } = timeline ?? {};

  useEffect(() => {
    pullUserPlaylists();
  }, [pullUserPlaylists]);

  return (
    <BaseRoute>
      <Stack direction="row" spacing={3} sx={{ px: 3, height: '100%' }}>
        <Stack
          direction="column"
          sx={{ height: '100%', overflow: 'auto', flex: '2', py: 2 }}
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
          sx={{ height: '100%', overflow: 'auto', flex: '5', py: 2 }}
          spacing={3}
        >
          <Paper elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Typography variant="h4">Timeline</Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, overflow: 'visible' }}>
            <Stack direction="row">
              <Button color="success" onClick={generateTimeline}>
                {'Generate Timeline'}
              </Button>
              <Box>
                {isLoading && (
                  <Typography variant="h6">Generating timeline</Typography>
                )}
                {isLoaded && !suggestedPlaylists?.length && (
                  <Typography variant="h6">
                    No timeline was generated
                  </Typography>
                )}
              </Box>
            </Stack>
          </Paper>

          {suggestedPlaylists?.map((playlist, j) => (
            <Paper elevation={3} key={j.toString()}>
              <TimelineSuggestedPlaylist playlist={playlist} />
            </Paper>
          ))}
        </Stack>
      </Stack>
    </BaseRoute>
  );
}
