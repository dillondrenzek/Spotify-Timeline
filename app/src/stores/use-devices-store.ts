import { create } from 'zustand';
import { ApiTypes } from 'api-types';
import { httpRequest, parseJson } from '../lib/http';
import { useUserStore } from './use-user-store';
import { ApiUrls } from '../api/urls';

type DevicesStore = {
  devices: ApiTypes.Device[];

  isLoaded: boolean;

  isLoading: boolean;

  pullDevices: () => Promise<ApiTypes.Device[]>;
};

export const useDevicesStore = create<DevicesStore>((set, get) => ({
  devices: [],

  isLoaded: false,

  isLoading: false,

  pullDevices: async () => {
    set({ isLoading: true });

    const devices = await httpRequest(ApiUrls.mePlayerDevices)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({
      devices,
      isLoaded: true,
      isLoading: false,
    });

    return devices;
  },
}));

function isValidResult(
  value: unknown
): value is ApiTypes.GetUsersDevicesResponse {
  if (!value) {
    return false;
  }
  return Array.isArray(value);
}

function convert(
  result: ApiTypes.GetUsersDevicesResponse
): ApiTypes.GetUsersDevicesResponse {
  return result;
}
