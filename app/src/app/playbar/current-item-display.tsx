import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { ApiTypes } from 'api-types';
import { grey } from '@mui/material/colors';

export function CurrentItemDisplay(props: {
  item: ApiTypes.PlayerState['item'];
}) {
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
