import React from 'react';
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Button,
  Box,
  Slider,
} from '@mui/material';
import { usePlayerState, PlayerState } from '../hooks/use-player-state';
import { green, grey, orange } from '@mui/material/colors';
import { VolumeDown, VolumeUp } from '@mui/icons-material';

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
  const { state, fetch, timestamp } = usePlayerState();
  const { item, is_playing, device, repeat_state, shuffle_state } = state;

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
          <DeviceDisplay device={device} isPlaying={is_playing} />
          {device && <VolumeDisplay volumePercent={device?.volume_percent} />}
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
          <CurrentItemDisplay item={item} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
