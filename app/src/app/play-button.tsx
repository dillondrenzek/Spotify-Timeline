import React, { useCallback, useMemo } from 'react';
import { IconButton, IconButtonProps, IconProps } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { usePlayButton } from '../hooks/use-play-button';
import { ErrorHandler } from '../lib/error';
import { Toast, useErrorToast } from '../toast';
import { isApiError } from '../lib/api-error';

export function PlayButton(props: {
  uri: string;
  contextUri?: string;
  deviceId?: string;
  color?: IconProps['color'];
  size?: IconButtonProps['size'];
}) {
  const { uri, contextUri, deviceId, color, size = 'small' } = props;

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

  const { play, isPlaying } = usePlayButton(uri, contextUri, deviceId);

  const handleClick = useCallback(() => {
    play().catch(handleError);
  }, [play, handleError]);

  const iconSize = useMemo(() => {
    switch (size) {
      case 'large':
        return '40px';
      case 'medium':
        return '32px';
      case 'small':
      default:
        return '24px';
    }
  }, [size]);

  return (
    <>
      <Toast {...toastProps} />
      <IconButton size={'small'} onClick={handleClick}>
        {isPlaying ? (
          <PauseCircleOutlineIcon
            sx={{ fontSize: iconSize }}
            color={color ?? isPlaying ? 'success' : 'action'}
          />
        ) : (
          <PlayCircleOutlineIcon
            sx={{ fontSize: iconSize }}
            color={color ?? isPlaying ? 'success' : 'action'}
          />
        )}
      </IconButton>
    </>
  );
}
