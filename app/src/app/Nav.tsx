import React, { PropsWithChildren } from 'react';
import { AppBar, Box, Toolbar, Typography, Link, Stack } from '@mui/material';
import { useCurrentUser } from '../hooks/use-current-user';
import { AuthLinks } from '../lib/auth';

function NavProfileDisplay(
  props: PropsWithChildren<{
    user: SpotifyApi.CurrentUserProfile;
  }>
) {
  const { user } = props;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {user.images?.length ? (
        <img alt="User's profile" src={user.images[0].url} height={48} />
      ) : null}
      <Stack direction="column" spacing={0}>
        <Typography>{user?.display_name}</Typography>
        <Typography>{user?.email}</Typography>
      </Stack>
    </Stack>
  );
}

function NavLink(
  props: PropsWithChildren<{
    href: string;
  }>
) {
  const { children, ...passthrough } = props;
  return (
    <Box>
      <Link color="inherit" {...passthrough}>
        {children}
      </Link>
    </Box>
  );
}

export function Nav() {
  const { currentUser } = useCurrentUser();

  return (
    <AppBar color="default">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" noWrap component="div">
            Spotify Timeline
          </Typography>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/timeline">Timeline</NavLink>
        </Stack>
        {currentUser ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <NavProfileDisplay user={currentUser} />
            <NavLink href="https://accounts.spotify.com/en/status">
              Account
            </NavLink>
            <NavLink href={AuthLinks.logout}>Logout</NavLink>
          </Stack>
        ) : (
          <NavLink href={AuthLinks.login}>Login</NavLink>
        )}
      </Toolbar>
    </AppBar>
  );
}
