import React, { PropsWithChildren } from 'react';
import { CssBaseline, Stack } from '@mui/material';
import { Nav } from '../app/Nav';

export function BaseRoute(props: PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <Nav />
      <Stack direction="column" sx={{ mt: 8 }}>
        {children}
      </Stack>
    </>
  );
}
