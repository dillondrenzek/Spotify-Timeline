import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  Stack,
  LinkProps,
  Avatar,
  AvatarProps,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
  ButtonProps,
  Tooltip,
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
          {/* <NavLink variant="title" color="success" href="/"> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={700}
            textTransform="capitalize"
          >
            Spotify Timeline
          </Typography>
          {/* </NavLink> */}
          {/* <Stack direction="row" spacing={1} alignItems="center">
            <NavLink href="/">Home</NavLink>
            {currentUser ? <NavLink href="/timeline">Timeline</NavLink> : null}
          </Stack> */}
        </Stack>
        {currentUser ? (
          <NavProfileDisplay user={currentUser} />
        ) : (
          <NavLink href={AuthLinks.login}>Login</NavLink>
        )}
      </Toolbar>
    </AppBar>
  );
}

/**
 * NOTE: `user` is guaranteed
 */
function NavProfileDisplay(
  props: PropsWithChildren<{
    user: ApiTypes.CurrentUserProfile;
  }>
) {
  const { user } = props;

  const { logout } = useUserStore();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(null);
    },
    []
  );

  const avatarProps = useMemo<Partial<AvatarProps>>(() => {
    const src = user.images?.[0]?.url;
    return {
      alt: user.display_name,
      src,
      children: src ? null : user.display_name?.charAt(0) ?? '',
    };
  }, [user.display_name, user.images]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip
          title={
            <Typography color="inherit">
              Hey there!{' '}
              <Typography color="inherit" fontWeight={500}>
                {user.display_name}
              </Typography>
            </Typography>
          }
        >
          <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            <Avatar
              variant="rounded"
              sx={{ width: '50px', height: '50px' }}
              {...avatarProps}
            />
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseMenu}
        >
          <Stack spacing={0.75} sx={{ px: 2, py: 0.75 }}>
            <Typography variant="caption">
              You're signed in as{' '}
              <Typography component="span" variant="caption" fontWeight={700}>
                {user.email}
              </Typography>
            </Typography>
          </Stack>
          <Divider />
          <MenuItem onClick={logout}>
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}

type NavLinkProps = Omit<ButtonProps, 'variant'> & {
  /**
   * Custom variant
   */
  variant?: 'title' | 'nav';
};

function NavLink(props: NavLinkProps) {
  const { children, href, variant = 'nav', ...passthrough } = props;
  return (
    <Box>
      <Button
        size={variant === 'nav' ? 'medium' : 'large'}
        color="inherit"
        href={href}
        {...passthrough}
      >
        {children}
      </Button>
    </Box>
  );
}
