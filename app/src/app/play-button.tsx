import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useSpotifyPlayer } from '../hooks/use-spotify-player';

export function PlayButton(props: { uri: string; contextUri?: string }) {
  const { uri, contextUri } = props;
  const { play } = useSpotifyPlayer();

  const handleClick = useCallback(() => {
    play(uri, contextUri);
  }, [uri, play, contextUri]);

  return (
    <IconButton size="small" sx={{ mr: 1 }} onClick={handleClick}>
      <PlayCircleOutlineIcon />
    </IconButton>
  );
}
