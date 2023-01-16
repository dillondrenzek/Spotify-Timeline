import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { usePlayButton } from '../hooks/use-play-button';
import { ErrorHandler } from '../lib/error';
import { Toast, useErrorToast } from '../toast';
import { isApiError } from '../lib/api-error';

export function PlayButton(props: { uri: string; contextUri?: string }) {
  const { uri, contextUri } = props;

  const { showErrorToast, toastProps } = useErrorToast();

  const handleError = useCallback<ErrorHandler>(
    (err: any) => {
      if (isApiError(err)) {
        const { reason } = err;

        if (reason === 'NO_ACTIVE_DEVICE') {
          showErrorToast(
            'No active Spotify session. Start one in Spotify and then control the session from here.'
          );
        }
      }
    },
    [showErrorToast]
  );

  const clickPlay = usePlayButton(uri, contextUri, handleError);

  return (
    <>
      <Toast {...toastProps} />
      <IconButton size="small" onClick={clickPlay}>
        <PlayCircleOutlineIcon />
      </IconButton>
    </>
  );
}
