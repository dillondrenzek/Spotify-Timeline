import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Stack,
  Paper,
  Box,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import { ScreenDetector } from '../app/screen-detector';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { BaseRoute } from './base-route';
import { useTimelineStore } from '../stores/use-timeline-store';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { TimelineSuggestedPlaylist } from '../app/timeline-suggested-playlist';
import { useInfiniteScroll } from '../hooks/use-infinite-scroll';
import { SuggestedPlaylistStepper } from '../app/suggested-playlist-stepper';

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

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    generateTimeline();
    pullUserPlaylists();
  }, [pullUserPlaylists, generateTimeline]);

  const { ref: playlistsScrollRef, reset: resetPlaylistScroll } =
    useInfiniteScroll(() => fetchNextUserPlaylists().then(resetPlaylistScroll));

  const { ref: timelineScrollRef, reset: resetTimelineScroll } =
    useInfiniteScroll(() => fetchNextTimelinePage().then(resetTimelineScroll));

  const timelineTitleRef = useRef<HTMLDivElement>(null);

  const scrollPosition = useScrollPosition(
    (params) => {
      const { scrollTop, scrollHeight } = timelineScrollRef.current;
      console.log('scroll effect', params);
      console.log('scroll info:', scrollTop, scrollHeight);
    },
    [],
    timelineTitleRef,
    false,
    100,
    timelineScrollRef
  );

  console.log('scroll position', scrollPosition);

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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Typography variant="body1">
                  {userPlaylists?.length ?? '0'} playlists
                </Typography>
                <Button onClick={fetchNextUserPlaylists}>
                  Fetch Next Playlists
                </Button>
              </Stack>
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
          <Paper
            component={'div'}
            ref={timelineTitleRef}
            elevation={elevation}
            sx={{ p: 3, overflow: 'visible' }}
          >
            <Stack spacing={3}>
              <Typography variant="h4">Timeline</Typography>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ minWidth: '160px' }}
                  onClick={generateTimeline}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="success" />
                  ) : (
                    'Generate Timeline'
                  )}
                </Button>
                <Box>
                  {isLoaded && !suggestedPlaylists?.length && (
                    <Typography variant="h6">
                      No timeline was generated
                    </Typography>
                  )}
                </Box>
                <Button
                  disabled={currentPage && !currentPage.next}
                  onClick={fetchNextTimelinePage}
                >
                  Fetch next timeline page
                </Button>
                <Typography variant="body1">
                  {suggestedPlaylists?.length ?? '0'} items
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          {suggestedPlaylists?.map((playlist, j) => (
            <Paper elevation={elevation} key={playlist.startDate}>
              <ScreenDetector
                onEnterScreen={() => {
                  setCurrentIndex(j);
                }}
              />
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
          <SuggestedPlaylistStepper
            activePlaylist={suggestedPlaylists[currentIndex] ?? null}
            suggestedPlaylists={suggestedPlaylists}
          />
        </Stack>
      </Stack>
    </BaseRoute>
  );
}
