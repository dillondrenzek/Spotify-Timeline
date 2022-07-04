import React from 'react';
import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';

export function Playbar() {
  const { title, artistName } = {
    title: 'Test',
    artistName: 'Artist',
  };

  return (
    <AppBar color="default" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" noWrap component="div">
            Player
          </Typography>
          <Typography variant="body1" noWrap component="div">
            {title} by {artistName}
          </Typography>
          <Button>Prev</Button>
          <Button>Play</Button>
          <Button>Next</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
