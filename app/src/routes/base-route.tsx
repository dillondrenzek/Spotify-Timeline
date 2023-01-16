import React, { PropsWithChildren } from 'react';
import { CssBaseline, Stack } from '@mui/material';
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
      {!hideNav && <Nav />}
      {!hidePlaybar && <Playbar />}
      <Stack direction="column" sx={{ mt: 8, backgroundColor: grey[200] }}>
        {children}
      </Stack>
    </>
  );
}
