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
  Button,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { BaseRoute } from './base-route';
import { PlayButton } from '../app/play-button';
import { useTimelineStore } from '../stores/use-timeline-store';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylists } from '../hooks/use-user-playlists';
import { ApiTypes } from 'api-types';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { useUserStore } from '../stores/use-user-store';

function formatDate(value: string): string {
  return new Date(Date.parse(value)).toLocaleDateString();
}

function dateRangeDisplay(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} to ${formatDate(endDate)}`;
}

export function TimelineRoute() {
  const { timeline, generateTimeline, isLoaded } = useTimelineStore();
  const { playlists, pullUserPlaylists, createPlaylist } =
    useUserPlaylistsStore();
  const { currentUser } = useUserStore();

  // const { playlists } = useUserPlaylists();

  const savePlaylist = (newPlaylist: ApiTypes.SuggestedPlaylist) => () => {
    createPlaylist({
      name: newPlaylist.title,
      track_uris: newPlaylist.tracks.map((t) => t.spotifyUri),
      user_id: currentUser.id,
    });
  };

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
                        <Stack direction="row" alignItems="center" spacing={3}>
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
                          <Button
                            variant="contained"
                            color="success"
                            onClick={savePlaylist(playlist)}
                          >
                            Save
                          </Button>
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
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
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
        </Stack>
      </Container>
    </BaseRoute>
  );
}
