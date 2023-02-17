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
  const { player, play, pause } = usePlayerStore();
  const calcDeviceId = deviceId ?? player?.device?.id ?? devices[0]?.id ?? null;
  const isActive = player?.item?.uri === uri;
  const isPlaying = isActive && player?.is_playing;

  const playToggle = useCallback(() => {
    if (!isAuthenticated) {
      return null;
    }

    return isPlaying
      ? pause(calcDeviceId)
      : play(uri, contextUri, calcDeviceId);
  }, [isAuthenticated, calcDeviceId, pause, play, uri, contextUri, isPlaying]);

  return {
    playToggle,
    isPlaying,
    isActive,
  };
}
