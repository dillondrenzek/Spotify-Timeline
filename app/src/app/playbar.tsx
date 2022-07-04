import React from 'react';
import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';
import { usePlayerState } from '../hooks/use-player-state';

export function Playbar() {
  const { state, fetch } = usePlayerState();
  const { item, is_playing } = state;

  const { title } = {
    title: item?.name ?? '',
  };

  return (
    <AppBar color="default" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" noWrap component="div">
            Player
          </Typography>
          <Typography variant="body1" noWrap component="div">
            {title}
          </Typography>
          <Typography variant="caption" color="secondary.main">
            {is_playing ? 'Playing' : 'Paused'}
          </Typography>
          <Button onClick={fetch}>Refresh</Button>
          {/* <Button>Prev</Button>
          <Button>Play</Button>
          <Button>Next</Button> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
