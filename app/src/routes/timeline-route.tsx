import React, { useEffect } from 'react';
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
import { grey } from '@mui/material/colors';
import { BaseRoute } from './base-route';
import { PlayButton } from '../app/play-button';
import { useTimelineStore } from '../stores/use-timeline-store';

function formatDate(value: string): string {
  return new Date(Date.parse(value)).toLocaleDateString();
}

function dateRangeDisplay(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} to ${formatDate(endDate)}`;
}

export function TimelineRoute() {
  const { timeline, generateTimeline } = useTimelineStore();

  const { suggestedPlaylists: playlists } = timeline ?? {};

  useEffect(() => {
    generateTimeline();
  }, [generateTimeline]);

  return (
    <BaseRoute>
      <Container fixed sx={{ pb: 6 }}>
        <Box my={3}>
          <Typography variant="h4">Timeline</Typography>
        </Box>
        {!playlists?.length && (
          <Typography variant="h6">No timeline was generated</Typography>
        )}
        {playlists?.map((playlist, j) => (
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
                      <Stack
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      >
                        <Typography variant="caption">
                          {playlist.tracks.length} tracks
                        </Typography>
                        <Typography variant="caption">
                          {dateRangeDisplay(
                            playlist.startDate,
                            playlist.endDate
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </ListItemText>
                </ListItem>
                <Divider />
                {!!playlist.tracks?.length ? (
                  playlist.tracks.map((track, i) => (
                    <ListItemButton key={i.toString()}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%' }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <PlayButton uri={track?.spotifyUri} />
                          <Stack direction="column">
                            <Typography>
                              {track?.title || 'Untitled'}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              {track?.artists.map((artist, i) => (
                                <Typography
                                  variant="caption"
                                  key={i}
                                  sx={{ color: grey[400] }}
                                >
                                  {artist.name}
                                </Typography>
                              ))}
                            </Stack>
                          </Stack>
                        </Stack>
                        <Typography variant="caption">
                          {formatDate(track.addedAt)}
                        </Typography>
                      </Stack>
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
