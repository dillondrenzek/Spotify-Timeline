import { useEffect, useState } from 'react';
import { useAuthToken } from './use-auth-token';

export interface CurrentUserProfile {
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

export const useCurrentUser = () => {
  const { authToken, clearAuthToken } = useAuthToken();
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (authToken && !currentUser) {
      fetch('/api/me')
        .then((res) => {
          res
            .json()
            .then((result) => {
              console.log('me:', result);
              setCurrentUser(result);
              setIsLoaded(true);
            })
            .catch((err) => {
              console.error('Error parsing JSON:', err);
              setIsLoaded(true);
            });
        })
        .catch((err) => {
          console.error('Error fetching /api/me:', err);
          setIsLoaded(true);
          clearAuthToken();
        });
    }
  }, [authToken, clearAuthToken, currentUser]);

  return {
    currentUser,
    isLoaded,
  };
};
