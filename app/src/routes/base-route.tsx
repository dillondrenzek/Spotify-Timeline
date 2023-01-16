import React, { PropsWithChildren } from 'react';
import { CssBaseline, Stack, Box } from '@mui/material';
import { Nav } from '../app/Nav';
import { grey } from '@mui/material/colors';
import { Playbar } from '../app/playbar';

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

  return (
    <>
      <CssBaseline />
      <Box
        display="grid"
        gridTemplateRows="64px 1fr 64px"
        sx={{ height: '100vh', backgroundColor: grey[400] }}
      >
        <Box>{!hideNav && <Nav />}</Box>
        <Box sx={{ overflow: 'auto' }}>{children}</Box>
        <Box>{!hidePlaybar && <Playbar />}</Box>
      </Box>
    </>
  );
}
