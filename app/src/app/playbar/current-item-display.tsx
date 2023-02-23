import React from 'react';
import { Stack, Typography, Box, Avatar, Link } from '@mui/material';
import { ApiTypes } from 'api-types';
import { grey } from '@mui/material/colors';

export function CurrentItemDisplay(props: {
  item: ApiTypes.PlayerState['item'];
}) {
  const { item } = props;

  return item ? (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt={item?.name}
        src={item?.album?.images?.[0]?.url}
        variant="rounded"
        sx={{ height: '50px', width: '50px' }}
      />
      <Stack direction="column">
        <Typography fontWeight={500}>{item?.name || ''}</Typography>
        <Box>
          {Array.isArray(item?.artists)
            ? item?.artists.map((item, i) => (
                <Link
                  variant="caption"
                  underline="none"
                  key={i}
                  sx={{ color: grey[400], mr: 1, fontWeight: 400 }}
                  href={item?.external_urls.spotify}
                >
                  {item?.name}
                </Link>
              ))
            : ''}
        </Box>
      </Stack>
    </Stack>
  ) : null;
}
