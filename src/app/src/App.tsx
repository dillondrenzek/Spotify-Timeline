import React, { useState, useEffect } from 'react';
import { useAuthToken } from './auth/use-auth-token';
import './App.scss';

interface CurrentUserProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: null; // number?
    url: string;
    width: null; // number?
  }[];
  product: 'premium';
  type: 'user';
  uri: string;

  // "country": "SE",
  // "display_name": "JM Wizzler",
  // "email": "email@example.com",
  // "external_urls": { "spotify": "https://open.spotify.com/user/wizzler" },
  // "followers": { "href": null, "total": 3829 },
  // "href": "https://api.spotify.com/v1/users/wizzler",
  // "id": "wizzler",
  // "images": [
  //   { "height": null, "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg", "width": null }
  // ],
  // "product": "premium",
  // "type": "user",
  // "uri": "spotify:user:wizzler"
}

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(null);
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
          <div>{currentUser?.display_name}</div>
          <div>{currentUser?.email}</div>
          <img src={currentUser?.images[0]?.url} height={60}/>
          <a 
            className="App-link"
            href="/spotify/logout"
            rel="noopener noreferrer"
          >
            Logout
          </a>
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
