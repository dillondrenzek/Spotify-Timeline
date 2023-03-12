import React, { useEffect } from 'react';
import { AppBar, Toolbar, Stack, styled, StackProps } from '@mui/material';
import { usePlayerStore } from '../stores/use-player-store';
import { useDevicesStore } from '../stores/use-devices-store';
import { PlayButton } from './play-button';
import { SyncButton } from './playbar/sync-button';
import { CurrentItemDisplay } from './playbar/current-item-display';
import { DeviceDisplay } from './playbar/device-display';

/**
 * Container that divides the playbar into thirds
 */
const PlaybarThird = styled((props: StackProps) => (
  <Stack direction="row" {...props} />
))({
  flex: '1 1 33%',
  alignItems: 'center',
});

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
          <PlaybarThird justifyContent="flex-start" spacing={3}>
            <SyncButton timestamp={timestamp} onClick={pullPlayerState} />
            <CurrentItemDisplay item={item} />
          </PlaybarThird>

          <PlaybarThird justifyContent="center" spacing={4}>
            <PlayButton uri={item?.uri} size="large" />
          </PlaybarThird>

          <PlaybarThird justifyContent="flex-end">
            <DeviceDisplay device={device} isPlaying={is_playing} />
          </PlaybarThird>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
