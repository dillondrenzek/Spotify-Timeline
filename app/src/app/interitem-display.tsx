import React, { ReactNode } from 'react';
import { Box, BoxProps, Card } from '@mui/material';
import { grey } from '@mui/material/colors';

export function InteritemDisplay(props: {
  sx?: BoxProps['sx'];
  children: ReactNode;
}) {
  const { sx, children } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        transform: 'translateY(50%)',
        height: '20px',
        width: '100%',
        cursor: 'pointer',
        zIndex: 100,
        opacity: 0,
        '&:hover': {
          // backgroundColor: grey[100],
          opacity: 1,
        },
        ...sx,
      }}
    >
      <Card
        elevation={1}
        sx={{ position: 'relative', backgroundColor: 'white', zIndex: 105 }}
      >
        {children}
      </Card>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          zIndex: 101,
          backgroundColor: grey[300],
        }}
      />
    </Box>
  );
}
