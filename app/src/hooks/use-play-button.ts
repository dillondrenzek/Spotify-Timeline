import { useCallback } from 'react';
import { usePlayerStore } from '../stores/use-player-store';
import { useUserStore } from '../stores/use-user-store';

export function usePlayButton(uri: string, contextUri?: string) {
  const { isAuthenticated } = useUserStore();
  const { player, play: storePlay } = usePlayerStore();
  const deviceId = player?.device?.id ?? null;

  const play = useCallback(() => {
    if (!isAuthenticated) {
      return null;
    }

    return storePlay(uri, contextUri, deviceId);
  }, [isAuthenticated, deviceId, storePlay, uri, contextUri]);

  return {
    play,
    isPlaying: player?.item?.uri === uri,
  };
}
