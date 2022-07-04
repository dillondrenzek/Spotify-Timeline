import React from 'react';
import { AppBar, Toolbar, Stack, Typography, Button, Box } from '@mui/material';
import { usePlayerState } from '../hooks/use-player-state';
import { green, grey, orange } from '@mui/material/colors';

export function Playbar() {
  const { state, fetch, timestamp } = usePlayerState();
  const { item, is_playing } = state;

  return (
    <AppBar color="default" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" noWrap component="div">
            Player
          </Typography>
          <Stack direction="column">
            <Button onClick={fetch}>Refresh</Button>
            {timestamp ? (
              <Typography variant="caption" sx={{ color: grey[400], mr: 1 }}>
                {timestamp}
              </Typography>
            ) : null}
          </Stack>
          <Typography
            variant="caption"
            fontWeight="bold"
            color={is_playing ? green[400] : orange[700]}
          >
            {is_playing ? 'Playing' : 'Paused'}
          </Typography>
          {item ? (
            <Stack direction="column">
              <Typography>{item?.name || 'Untitled'}</Typography>
              <Box>
                {Array.isArray(item?.artists)
                  ? item?.artists.map((item, i) => (
                      <Typography
                        variant="caption"
                        key={i}
                        sx={{ color: grey[400], mr: 1 }}
                      >
                        {item?.name}
                      </Typography>
                    ))
                  : ''}
              </Box>
            </Stack>
          ) : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
