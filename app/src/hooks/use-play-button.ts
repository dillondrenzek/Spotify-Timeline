import { useCallback } from 'react';
import { useDevicesStore } from '../stores/use-devices-store';
import { usePlayerStore } from '../stores/use-player-store';
import { useUserStore } from '../stores/use-user-store';

export function usePlayButton(uri: string, contextUri?: string) {
  const { isAuthenticated } = useUserStore();
  const { devices } = useDevicesStore();
  const { player, play: storePlay } = usePlayerStore();
  const deviceId = player?.device?.id ?? devices[0]?.id ?? null;

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
