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
import { grey } from '@mui/material/colors';
import { BaseRoute } from './base-route';
import { useTimeline } from '../hooks/use-timeline';
import { PlayButton } from '../app/play-button';

export function TimelineRoute() {
  const { playlists } = useTimeline();

  return (
    <BaseRoute>
      <Container fixed sx={{ pb: 6 }}>
        <Box my={3}>
          <Typography variant="h4">Timeline</Typography>
        </Box>
        {!playlists?.length && (
          <Typography variant="h6">No timeline was generated</Typography>
        )}
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
                      <PlayButton uri={track?.spotifyUri} />
                      <Stack direction="column">
                        <Typography>{track?.title || 'Untitled'}</Typography>
                        <Box>
                          {track?.artists.map((artist, i) => (
                            <Typography
                              variant="caption"
                              key={i}
                              sx={{ color: grey[400], mr: 1 }}
                            >
                              {artist.name}
                            </Typography>
                          ))}
                        </Box>
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
