import { useCallback } from 'react';
import { useDevicesStore } from '../stores/use-devices-store';
import { usePlayerStore } from '../stores/use-player-store';
import { useUserStore } from '../stores/use-user-store';

export function usePlayButton(
  uri: string,
  contextUri?: string,
  deviceId?: string
) {
  const { isAuthenticated } = useUserStore();
  const { devices } = useDevicesStore();
  const { player, play: storePlay } = usePlayerStore();
  const calcDeviceId = deviceId ?? player?.device?.id ?? devices[0]?.id ?? null;

  const play = useCallback(() => {
    if (!isAuthenticated) {
      return null;
    }

    return storePlay(uri, contextUri, calcDeviceId);
  }, [isAuthenticated, calcDeviceId, storePlay, uri, contextUri]);

  return {
    play,
    isPlaying: player?.item?.uri === uri,
  };
}
