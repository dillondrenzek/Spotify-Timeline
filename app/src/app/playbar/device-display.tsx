import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ApiTypes } from 'api-types';
import { green, orange } from '@mui/material/colors';

export function DeviceDisplay(props: {
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
