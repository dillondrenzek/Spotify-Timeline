import React, { useMemo } from 'react';
import {
  Typography,
  IconButton,
  Tooltip,
  IconButtonProps,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Sync } from '@mui/icons-material';

type SyncButtonProps = IconButtonProps & {
  /**
   * @type datetime
   */
  timestamp: number;
};

export function SyncButton(props: SyncButtonProps) {
  const { timestamp, onClick } = props;

  const renderedTimestamp = useMemo(() => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
  }, [timestamp]);

  return (
    <Tooltip
      title={
        <Typography color="inherit">
          <Typography
            component="span"
            display="block"
            color="inherit"
            fontWeight={500}
          >
            Refresh Player State
          </Typography>{' '}
          {renderedTimestamp ? (
            <Typography
              component="span"
              display="block"
              variant="caption"
              sx={{ color: grey[400], mr: 1 }}
            >
              Last updated: {renderedTimestamp}
            </Typography>
          ) : null}{' '}
        </Typography>
      }
    >
      <IconButton size="small" onClick={onClick}>
        <Sync color="primary" />
      </IconButton>
    </Tooltip>
  );
}
