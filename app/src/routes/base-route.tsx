import React, { PropsWithChildren, useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Nav } from '../app/Nav';
import { grey } from '@mui/material/colors';
import { Playbar } from '../app/playbar';
import { usePlayerStore } from '../stores/use-player-store';
import { createTheme, ThemeProvider } from '@mui/material';
import { useUserStore } from '../stores/use-user-store';

const theme = createTheme();

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

  const { isAuthenticated } = useUserStore();
  const { player, pullPlayerState } = usePlayerStore();

  const showPlaybar = !hidePlaybar && isAuthenticated && !!player;

  useEffect(() => {
    pullPlayerState();
  }, [pullPlayerState]);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
