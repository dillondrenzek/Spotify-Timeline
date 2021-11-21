import React from 'react';
import { AppBar, Box, Toolbar, Typography, Link, Stack } from '@mui/material';
import { useCurrentUser } from '../../hooks/use-current-user';
import './Nav.scss';

export function Nav() {
  const { currentUser } = useCurrentUser();

  return (
    <AppBar color='default'>
      <Toolbar sx={{ justifyContent: 'space-between'}}>
        <Typography 
          variant='h6'
          noWrap
          component='div'
        >Spotify Timeline</Typography>
        {currentUser ? (
          <Stack direction='row' spacing={1} alignItems='center'>
            <Stack direction='row' spacing={1} alignItems='center'>
              {currentUser.images?.length ? (
                <img
                  alt="User's profile"
                  src={currentUser.images[0].url}
                  height={48}
                />
              ) : null}
              <Stack direction='column' spacing={0}>
                <Typography>{currentUser?.display_name}</Typography>
                <Typography>{currentUser?.email}</Typography>
              </Stack>
            </Stack>
            <Box>
              <Link color='inherit' href="https://accounts.spotify.com/en/status">Account</Link>
            </Box>
            <Box>
              <Link color='inherit' href="/spotify/logout">Logout</Link>
            </Box>
          </Stack>
        ) : (
          <Link color='inherit' href="/spotify/login">Login</Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
