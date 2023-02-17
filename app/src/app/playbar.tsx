import React, { useEffect, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { ApiTypes } from 'api-types';
import { green, grey, orange } from '@mui/material/colors';
import { Sync } from '@mui/icons-material';
import { usePlayerStore } from '../stores/use-player-store';
import { useDevicesStore } from '../stores/use-devices-store';
import { PlayButton } from './play-button';

function DeviceDisplay(props: {
  device: ApiTypes.PlayerState['device'];
  isPlaying: boolean;
}) {
  const { device, isPlaying } = props;

  if (!device) {
    return null;
  }

  return (
    <Stack direction="column">
      <Typography
        variant="caption"
        fontWeight="bold"
        color={isPlaying ? green[400] : orange[700]}
      >
        {isPlaying ? 'Playing' : 'Paused'} on
      </Typography>
      <Typography variant="caption">{device?.name}</Typography>
    </Stack>
  );
}

function CurrentItemDisplay(props: { item: ApiTypes.PlayerState['item'] }) {
  const { item } = props;

  return item ? (
    <Stack direction="column">
      <Typography fontWeight={500}>{item?.name || ''}</Typography>
      <Box>
        {Array.isArray(item?.artists)
          ? item?.artists.map((item, i) => (
              <Typography
                variant="caption"
                key={i}
                sx={{ color: grey[400], mr: 1, fontWeight: 400 }}
              >
                {item?.name}
              </Typography>
            ))
          : ''}
      </Box>
    </Stack>
  ) : null;
}

export function Playbar() {
  const { pullPlayerState, player } = usePlayerStore();
  const { pullDevices } = useDevicesStore();
  const { item, is_playing, device, timestamp } = player ?? {};

  const renderedTimestamp = useMemo(() => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
  }, [timestamp]);

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
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton size="small" onClick={pullPlayerState}>
              <Sync color="primary" />
            </IconButton>
            <Stack direction="column">
              <Typography variant="h6" noWrap component="div">
                Player
              </Typography>
              {renderedTimestamp ? (
                <Typography variant="caption" sx={{ color: grey[400], mr: 1 }}>
                  {renderedTimestamp}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={4}>
            <PlayButton uri={item?.uri} size="large" color="secondary" />
            <CurrentItemDisplay item={item} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <DeviceDisplay device={device} isPlaying={is_playing} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
