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
import { BaseRoute } from './base-route';
import { useTimelineStore } from '../stores/use-timeline-store';
import { PlaylistList } from '../app/playlist-list';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { TimelineSuggestedPlaylist } from '../app/timeline-suggested-playlist';
import { useInfiniteScroll } from '../hooks/use-infinite-scroll';
import { SuggestedPlaylistStepper } from '../app/suggested-playlist-stepper';
import { useTimeline } from '../hooks/use-timeline';
import { InteritemDisplay } from '../app/interitem-display';

const elevation = 1;

export function TimelineRoute() {
  const {
    playlists: timelineSuggestedPlaylists,
    generateTimeline,
    isLoaded,
    isLoading,
    currentPage,
    fetchNextPage: fetchNextTimelinePage,
  } = useTimelineStore();

  const [state, dispatch] = useTimeline(timelineSuggestedPlaylists);
  const { suggestedPlaylists } = state;

  const {
    playlists: userPlaylists,
    pullUserPlaylists,
    fetchNextUserPlaylists,
  } = useUserPlaylistsStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    generateTimeline().then((pl) =>
      dispatch({ type: 'SET_SUGGESTED_PLAYLISTS', data: pl.items })
    );
    pullUserPlaylists();
  }, [pullUserPlaylists, generateTimeline, dispatch]);

  useEffect(() => {
    dispatch({
      type: 'SET_SUGGESTED_PLAYLISTS',
      data: timelineSuggestedPlaylists,
    });
  }, [timelineSuggestedPlaylists, dispatch]);

  const { ref: playlistsScrollRef, reset: resetPlaylistScroll } =
    useInfiniteScroll(() => fetchNextUserPlaylists().then(resetPlaylistScroll));

  const { ref: timelineScrollRef, reset: resetTimelineScroll } =
    useInfiniteScroll(() => fetchNextTimelinePage().then(resetTimelineScroll));

  const timelineTitleRef = useRef<HTMLDivElement>(null);

  return (
    <BaseRoute>
      <Stack direction="row" spacing={3} sx={{ px: 3, height: '100%' }}>
        <Stack
          direction="column"
          sx={{ height: '100%', overflow: 'auto', flex: '1', py: 2 }}
          spacing={3}
        >
          <SuggestedPlaylistStepper
            activePlaylist={suggestedPlaylists[currentIndex] ?? null}
            suggestedPlaylists={suggestedPlaylists}
          />
          <Button disabled={isLoading} onClick={fetchNextTimelinePage}>
            Load More
          </Button>
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

          {/* Empty state */}
          {isLoaded && !suggestedPlaylists?.length && (
            <Paper elevation={elevation} sx={{ p: 3 }}>
              <Stack sx={{ alignItems: 'center' }}>
                {isLoading && <CircularProgress size={24} color="success" />}
                {!isLoading && isLoaded && !suggestedPlaylists?.length && (
                  <Typography
                    variant="caption"
                    sx={{ textTransform: 'uppercase' }}
                  >
                    No timeline was generated
                  </Typography>
                )}
              </Stack>
            </Paper>
          )}

          {/* Suggested Playlists */}
          {suggestedPlaylists?.map((playlist, j) => (
            <Box
              sx={{ position: 'relative' }}
              key={playlist.startDate + playlist.endDate}
            >
              <Paper elevation={elevation}>
                <ScreenDetector onEnterScreen={() => setCurrentIndex(j)} />
                <TimelineSuggestedPlaylist
                  playlist={playlist}
                  onSplit={(atIndex) => {
                    dispatch({
                      type: 'SPLIT_LIST_AT_INDEX',
                      data: {
                        atIndex: atIndex + 1,
                        playlist,
                        playlistIndex: j,
                      },
                    });
                  }}
                />
              </Paper>
              <InteritemDisplay>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  onClick={() =>
                    dispatch({
                      type: 'MERGE_LISTS',
                      data: {
                        atIndex: [j, j + 1],
                      },
                    })
                  }
                >
                  Merge
                </Button>
              </InteritemDisplay>
            </Box>
          ))}

          {/* End of List */}
          {suggestedPlaylists?.length > 0 && (
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
      </Stack>
    </BaseRoute>
  );
}
