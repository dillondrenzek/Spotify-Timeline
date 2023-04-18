import { AxiosResponse } from 'axios';

export interface BaseResponse<T> {
  isValid: (value: unknown) => value is T;

  fromResponse: (res: AxiosResponse<any>) => T;
}
