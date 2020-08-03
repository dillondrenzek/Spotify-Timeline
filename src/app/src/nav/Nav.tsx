import React from 'react';
import { useCurrentUser } from '../hooks/use-current-user';
import './Nav.scss';

const SiteTitle = () => {
  return (
    <h1>Spotify Timeline</h1>
  );
}

export const Nav = () => {
  const { currentUser } = useCurrentUser();

  return (
    <nav className='Nav'>
      <div className='nav-item'>
        <SiteTitle />
      </div>

      <div className='nav-item'>

        {currentUser ? (
          <div className='user'>
            {currentUser.images?.length ? (
              <img src={currentUser.images[0].url} height={48} />
            ) : null}
            <div>
              <div>{currentUser?.display_name}</div>
              <div>{currentUser?.email}</div>
            </div>
          </div>
        ) : null}

        {currentUser ? (
          <a
            className="App-link"
            href="/spotify/logout"
            rel="noopener noreferrer"
          >
            Logout
          </a>
        ) : (
          <a
            className="App-link"
            href="/spotify/login"
            rel="noopener noreferrer"
          >
            Login
          </a>
        )}
      
      </div>
    </nav>
  );
}