import React from 'react';
import { CurrentUserProfile } from '../../../hooks/use-current-user';
import { NavLink } from '../nav-link/nav-link';

export interface SpotifyLoginButtonProps {
  currentUser?: CurrentUserProfile;
}

export const SpotifyLoginButton = ({
  currentUser,
}: SpotifyLoginButtonProps) => {
  return currentUser ? (
    <NavLink href="/spotify/logout">Logout</NavLink>
  ) : (
    <NavLink href="/spotify/login">Login</NavLink>
  );
};
