import React, { useEffect } from 'react';
import { AppBar, Toolbar, Stack, Typography, Box } from '@mui/material';
import { usePlayerStore } from '../stores/use-player-store';
import { useDevicesStore } from '../stores/use-devices-store';
import { PlayButton } from './play-button';
import { SyncButton } from './playbar/sync-button';
import { CurrentItemDisplay } from './playbar/current-item-display';
import { DeviceDisplay } from './playbar/device-display';

export function Playbar() {
  const { pullPlayerState, player } = usePlayerStore();
  const { pullDevices } = useDevicesStore();
  const { item, is_playing, device, timestamp } = player ?? {};

  useEffect(() => {
    pullPlayerState();
    pullDevices();
  }, [pullPlayerState, pullDevices]);

  return (
    <AppBar color="default" position="relative" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'stretch', width: '100%' }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <SyncButton timestamp={timestamp} onClick={pullPlayerState} />
            <CurrentItemDisplay item={item} />
          </Stack>

          <Stack direction="row" spacing={4}>
            <PlayButton uri={item?.uri} size="large" />
          </Stack>

          <Box>
            <DeviceDisplay device={device} isPlaying={is_playing} />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
