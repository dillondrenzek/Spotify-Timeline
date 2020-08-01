import React, { useState, useEffect } from 'react';
import { useAuthToken } from './auth/use-auth-token';
import './App.scss';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/me')
      .then((res) => {
        res.json().then((result) => {
          console.log('me:', result);
          setCurrentUser(result);
          setIsLoaded(true);
        }).catch((err) => {
          console.error('Error parsing JSON:', err);
          setIsLoaded(true);
        });
      })
      .catch((err) => {
        console.error('Error fetching /api/me:', err);
        setIsLoaded(true);
      });
  }, []);

  return {
    currentUser,
    isLoaded
  }
};

function App() {
  const [authToken] = useAuthToken();
  const {
    currentUser,
  } = useCurrentUser();

  return (
    <div className="App">
      {authToken ? (
        <div>
          {JSON.stringify(currentUser)}
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
