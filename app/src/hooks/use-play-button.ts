import { useCallback } from 'react';
import { useSpotifyPlayer } from '../hooks/use-spotify-player';

export function usePlayButton(uri: string, contextUri?: string) {
  const { play } = useSpotifyPlayer();

  return useCallback(() => {
    play(uri, contextUri);
  }, [uri, play, contextUri]);
}
