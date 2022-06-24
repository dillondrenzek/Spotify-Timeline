import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Container,
  List,
  ListItemText,
  ListItem,
  Paper,
  ListItemButton,
  Divider,
} from '@mui/material';
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
      <Container fixed>
        <Box my={3}>
          <Typography variant="h4">Timeline</Typography>
        </Box>
        {playlists.map((playlist, j) => (
          <Paper elevation={3} key={j.toString()}>
            <Stack direction="column" spacing={2} sx={{ mb: 6 }}>
              <List>
                <ListItem>
                  <ListItemText>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6">{playlist.title}</Typography>
                      <Typography variant="caption">
                        {playlist.tracks.length} tracks
                      </Typography>
                    </Stack>
                  </ListItemText>
                </ListItem>
                <Divider />
                {!!playlist.tracks?.length ? (
                  playlist.tracks.map((track, i) => (
                    <ListItemButton key={i.toString()}>
                      {track?.title || 'Untitled'}
                    </ListItemButton>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText>No tracks for this playlist</ListItemText>
                  </ListItem>
                )}
              </List>
            </Stack>
          </Paper>
        ))}
      </Container>
    </BaseRoute>
  );
}
