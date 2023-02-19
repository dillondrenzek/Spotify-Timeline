import React, { useEffect } from 'react';
import { Typography, Stack, Paper, Box, Button } from '@mui/material';
import { BaseRoute } from './base-route';
import { useTimelineStore } from '../stores/use-timeline-store';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { TimelineSuggestedPlaylist } from '../app/timeline-suggested-playlist';
import { useInfiniteScroll } from '../hooks/use-infinite-scroll';

const elevation = 1;

export function TimelineRoute() {
  const {
    playlists: suggestedPlaylists,
    generateTimeline,
    isLoaded,
    isLoading,
    currentPage,
    fetchNextPage: fetchNextTimelinePage,
  } = useTimelineStore();

  const {
    playlists: userPlaylists,
    pullUserPlaylists,
    fetchNextUserPlaylists,
  } = useUserPlaylistsStore();

  useEffect(() => {
    generateTimeline();
    pullUserPlaylists();
  }, [pullUserPlaylists, generateTimeline]);

  const { ref: playlistsScrollRef, reset: resetPlaylistScroll } =
    useInfiniteScroll(() => fetchNextUserPlaylists().then(resetPlaylistScroll));

  const { ref: timelineScrollRef, reset: resetTimelineScroll } =
    useInfiniteScroll(() => fetchNextTimelinePage().then(resetTimelineScroll));

  return (
    <BaseRoute>
      <Stack direction="row" spacing={3} sx={{ px: 3, height: '100%' }}>
        <Stack
          direction="column"
          sx={{
            height: '100%',
            overflow: 'auto',
            flex: '2',
            py: 2,
          }}
          spacing={3}
          ref={playlistsScrollRef}
        >
          <Paper elevation={elevation} sx={{ p: 3, overflow: 'visible' }}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" mb={2}>
                Playlists
              </Typography>
              <Typography variant="caption">
                To delete a playlist you've created, you must delete in the
                Spotify app.
              </Typography>
              <Typography variant="caption">
                {userPlaylists?.length ?? '0'} playlists
              </Typography>
              <Button onClick={fetchNextUserPlaylists}>
                Fetch Next Playlists
              </Button>
            </Stack>
          </Paper>
          <Paper elevation={elevation}>
            <PlaylistList playlists={userPlaylists} />
          </Paper>
        </Stack>
        <Stack
          direction="column"
          sx={{ height: '100%', overflow: 'auto', flex: '5', py: 2 }}
          spacing={3}
          ref={timelineScrollRef}
        >
          <Paper elevation={elevation} sx={{ p: 3, overflow: 'visible' }}>
            <Typography variant="h4">Timeline</Typography>
          </Paper>

          <Paper elevation={elevation} sx={{ p: 3, overflow: 'visible' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Button
                variant="outlined"
                color="success"
                onClick={generateTimeline}
              >
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
              <Button
                disabled={currentPage && !currentPage.offset}
                onClick={fetchNextTimelinePage}
              >
                Fetch next playlists
              </Button>
              <Typography>{suggestedPlaylists?.length ?? '0'} items</Typography>
            </Stack>
          </Paper>

          {suggestedPlaylists?.map((playlist, j) => (
            <Paper elevation={elevation} key={j.toString()}>
              <TimelineSuggestedPlaylist playlist={playlist} />
            </Paper>
          ))}

          {currentPage?.offset && suggestedPlaylists && (
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                {currentPage?.offset >= currentPage?.total ? (
                  <Typography>End of the list</Typography>
                ) : (
                  <Button disabled={isLoading} onClick={fetchNextTimelinePage}>
                    {isLoading ? 'Fetching...' : 'Fetch next playlists'}
                  </Button>
                )}
              </Box>
            </Paper>
          )}
        </Stack>

        <Stack
          direction="column"
          sx={{ height: '100%', overflow: 'auto', flex: '1', py: 2 }}
          spacing={3}
        >
          Dates
        </Stack>
      </Stack>
    </BaseRoute>
  );
}
