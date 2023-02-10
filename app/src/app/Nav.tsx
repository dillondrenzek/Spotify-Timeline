import React, { PropsWithChildren, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  Stack,
  LinkProps,
} from '@mui/material';
import { AuthLinks } from '../lib/auth';
import { useUserStore } from '../stores/use-user-store';
import { ApiTypes } from 'api-types';

export function Nav() {
  const { currentUser, isAuthenticated, isLoaded, pullCurrentUser, logout } =
    useUserStore();

  useEffect(() => {
    if (isAuthenticated && !isLoaded) {
      pullCurrentUser();
    }
  }, [isAuthenticated, isLoaded, pullCurrentUser]);

  return (
    <AppBar color="default" position="relative">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" noWrap component="div">
            Spotify Timeline
          </Typography>
          <NavLink href="/">Home</NavLink>
          {currentUser ? <NavLink href="/timeline">Timeline</NavLink> : null}
        </Stack>
        {currentUser ? (
          <Stack direction="row" spacing={3} alignItems="center">
            <NavProfileDisplay user={currentUser} />
            <NavLink onClick={logout}>Logout</NavLink>
          </Stack>
        ) : (
          <NavLink href={AuthLinks.login}>Login</NavLink>
        )}
      </Toolbar>
    </AppBar>
  );
}

function NavProfileDisplay(
  props: PropsWithChildren<{
    user: ApiTypes.CurrentUserProfile;
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

function NavLink(props: LinkProps) {
  const { children, ...passthrough } = props;
  return (
    <Box>
      <Link color="inherit" {...passthrough}>
        {children}
      </Link>
    </Box>
  );
}
