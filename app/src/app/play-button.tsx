import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { usePlayButton } from '../hooks/use-play-button';

export function PlayButton(props: { uri: string; contextUri?: string }) {
  const { uri, contextUri } = props;

  const clickPlay = usePlayButton(uri, contextUri);

  return (
    <IconButton size="small" sx={{ mr: 1 }} onClick={clickPlay}>
      <PlayCircleOutlineIcon />
    </IconButton>
  );
}
