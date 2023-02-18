import * as Types from '../types';
import { BaseResponse } from './base-model';

export const Device: BaseResponse<Types.Device> = {
  isValid(value): value is Types.Device {
    return (
      typeof value === 'object' &&
      'id' in value &&
      'is_active' in value &&
      'name' in value &&
      'type' in value &&
      'volume_percent' in value
    );
  },

  fromResponse(res): Types.Device {
    const { data } = res;

    if (Device.isValid(data)) {
      return data;
    }

    return null;
  },
};

export const UserDevices: BaseResponse<Types.UserDevices> = {
  isValid(value): value is Types.UserDevices {
    if (typeof value === 'object') {
      return (
        'devices' in value &&
        Array.isArray((value as any).devices) &&
        ((value as any).devices as any[]).every(Device.isValid)
      );
    }

    return false;
  },

  fromResponse(res): Types.UserDevices {
    const { data } = res;

    if (UserDevices.isValid(data)) {
      return data;
    }

    return null;
  },
};
