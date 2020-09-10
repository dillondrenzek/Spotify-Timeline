import React from 'react';
import { useCurrentUser } from '../../hooks/use-current-user';
import { NavLink } from './nav-link/nav-link';
import { SpotifyLoginButton } from './spotify-login-button/spotify-login-button';
import './Nav.scss';

const SiteTitle = () => {
  return <h1 className="site-title">Spotify Timeline</h1>;
};

export const Nav = () => {
  const { currentUser } = useCurrentUser();

  return (
    <nav className="Nav">
      <div className="nav-item">
        <SiteTitle />

        {currentUser ? (
          <div className="user">
            {currentUser.images?.length ? (
              <img src={currentUser.images[0].url} height={48} />
            ) : null}
            <div>
              <div>{currentUser?.display_name}</div>
              <div>{currentUser?.email}</div>
            </div>
          </div>
        ) : null}

        <SpotifyLoginButton currentUser={currentUser} />
      </div>
      <div className="nav-item">
        <NavLink href="https://accounts.spotify.com/en/status">Account</NavLink>
      </div>
    </nav>
  );
};
