import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { BaseRoute } from './base-route';
import { useTimeline } from '../hooks/use-timeline';
import * as Types from '../lib/timeline/timeline-types';

function track(title: string): Types.Track {
  return {
    album: null,
    artists: [],
    title,
  };
}
const fakeSavedSongs: Types.Track[] = Array.from(Array(42)).map((value) =>
  track('test')
);

export function TimelineRoute() {
  const { playlists } = useTimeline(fakeSavedSongs);

  return (
    <BaseRoute>
      <Typography variant="h4">Timeline</Typography>
      {playlists.map((playlist) => (
        <Stack direction="column" spacing={2} sx={{ mb: 10 }}>
          <Typography>{playlist.title}</Typography>
          <Stack direction="column" spacing={1}>
            {!!playlist.tracks?.length ? (
              playlist.tracks.map((track) => (
                <Box>{track?.title || 'Untitled'}</Box>
              ))
            ) : (
              <Box>No tracks for this playlist</Box>
            )}
          </Stack>
        </Stack>
      ))}
    </BaseRoute>
  );
}
