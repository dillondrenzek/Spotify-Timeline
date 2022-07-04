import React, { PropsWithChildren } from 'react';
import { CssBaseline, Stack } from '@mui/material';
import { Nav } from '../app/Nav';
import { grey } from '@mui/material/colors';
import { Playbar } from '../app/playbar';

export function BaseRoute(props: PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <Nav />
      <Playbar />
      <Stack direction="column" sx={{ mt: 8, backgroundColor: grey[200] }}>
        {children}
      </Stack>
    </>
  );
}
