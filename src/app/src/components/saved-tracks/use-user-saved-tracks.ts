import { useState, useEffect } from 'react';
import { useAuthToken } from '../../hooks/use-auth-token';

export function useUserSavedTracks() {
    const { authToken, clearAuthToken } = useAuthToken();
    const [savedTracks, setSavedTracks] = useState<SpotifyApi.SavedSongs[]>([]);

    useEffect(() => {
        if (authToken && !savedTracks?.length) {
            fetch('/api/me/tracks')
                .then((res) => {
                    res
                        .json()
                        .then((result: SpotifyApi.CurrentUserSavedSongs) => {
                            console.log('result:', result);
                            setSavedTracks(result.items);
                        })
                        .catch((err) => {
                            console.error('Error parsing JSON:', err);
                        });
                })
                .catch((err) => {
                    console.error('Error fetching /api/me:', err);
                    clearAuthToken();
                });
        }
    }, [authToken, clearAuthToken, savedTracks]);

    return {
        savedTracks,
    };
}