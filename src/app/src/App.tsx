import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import './App.scss';

function App() {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setAuthToken(Cookie.get('auth_token') || '');
  }, []);

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
