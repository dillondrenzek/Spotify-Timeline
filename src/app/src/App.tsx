import React, { useState, useEffect } from 'react';
import { useAuthToken } from './auth/use-auth-token';
import './App.scss';

function App() {
  const [authToken] = useAuthToken();

  console.log('auth_token', authToken);

  return (
    <div className="App">
      {authToken ? (
        <div>
          Auth token: {authToken}
        </div>
      ) : (
        <header className="App-header">
          <a
            className="App-link"
            href="/spotify/login"
            rel="noopener noreferrer"
          >
            Login to Spotify
          </a>
        </header>
      )}
    </div>
  );
}

export default App;
