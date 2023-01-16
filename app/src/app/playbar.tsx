import React, { useEffect, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Box,
  Slider,
  IconButton,
} from '@mui/material';
import { PlayerState } from '../hooks/use-player-state';
import { green, grey, orange } from '@mui/material/colors';
import { VolumeDown, VolumeUp, Sync } from '@mui/icons-material';
import { usePlayerStore } from '../stores/use-player-store';

function DeviceDisplay(props: {
  device: PlayerState['device'];
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

function VolumeDisplay(props: { volumePercent: number }) {
  const { volumePercent } = props;

  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{ mb: 1, minWidth: '150px' }}
      alignItems="center"
    >
      <VolumeDown fontSize="small" />
      <Slider
        aria-label="Volume"
        disabled
        size="small"
        defaultValue={volumePercent}
        valueLabelDisplay="auto"
      />
      <VolumeUp fontSize="small" />
    </Stack>
  );
}

function CurrentItemDisplay(props: { item: PlayerState['item'] }) {
  const { item } = props;

  return item ? (
    <Stack direction="column">
      <Typography>{item?.name || ''}</Typography>
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
  ) : null;
}

export function Playbar() {
  const { fetch, player } = usePlayerStore();
  const { item, is_playing, device, repeat_state, shuffle_state, timestamp } =
    player ?? {};

  const renderedTimestamp = useMemo(() => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
  }, [timestamp]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <AppBar color="default" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'stretch', width: '100%' }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack direction="row" spacing={2}>
            <IconButton size="small" onClick={fetch}>
              <Sync color="primary" />
            </IconButton>
            <Stack direction="column">
              <Typography variant="h6" noWrap component="div">
                Player
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {renderedTimestamp ? (
                  <Typography
                    variant="caption"
                    sx={{ color: grey[400], mr: 1 }}
                  >
                    {renderedTimestamp}
                  </Typography>
                ) : null}
              </Stack>
            </Stack>
            <CurrentItemDisplay item={item} />
          </Stack>

          <Stack direction="row" spacing={2}>
            {repeat_state != null && shuffle_state != null && (
              <Stack direction="column">
                <Typography variant="caption" sx={{ color: grey[400], mr: 1 }}>
                  Repeat: {repeat_state}
                </Typography>
                <Typography variant="caption" sx={{ color: grey[400], mr: 1 }}>
                  Shuffle: {shuffle_state ? 'on' : 'off'}
                </Typography>
              </Stack>
            )}
            {device && <VolumeDisplay volumePercent={device?.volume_percent} />}
            <DeviceDisplay device={device} isPlaying={is_playing} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
