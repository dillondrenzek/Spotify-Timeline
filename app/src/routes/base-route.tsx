import React, { PropsWithChildren } from 'react';
import { CssBaseline, Stack, Box } from '@mui/material';
import { Nav } from '../app/Nav';
import { grey } from '@mui/material/colors';
import { Playbar } from '../app/playbar';
import { useAuthToken } from '../hooks/use-auth-token';
import { usePlayerStore } from '../stores/use-player-store';

type BaseRouteProps = PropsWithChildren<{
  /**
   * Hides the nav component
   */
  hideNav?: boolean;

  /**
   * Hides the playbar
   */
  hidePlaybar?: boolean;
}>;

export function BaseRoute(props: BaseRouteProps) {
  const { children, hideNav, hidePlaybar } = props;

  const { authToken } = useAuthToken();
  const { player } = usePlayerStore();

  const showPlaybar = !hidePlaybar && authToken && !!player;

  return (
    <>
      <CssBaseline />
      <Box
        display="grid"
        gridTemplateRows={showPlaybar ? '64px 1fr 64px' : '64px 1fr'}
        sx={{ height: '100vh', backgroundColor: grey[400] }}
      >
        <Box>{!hideNav && <Nav />}</Box>
        <Box sx={{ overflow: 'auto' }}>{children}</Box>
        <Box>{showPlaybar && <Playbar />}</Box>
      </Box>
    </>
  );
}
