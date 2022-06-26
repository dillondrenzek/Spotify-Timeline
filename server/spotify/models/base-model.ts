import { AxiosResponse } from 'axios';

export interface BaseModel<T> {
  isValid: (value: unknown) => value is T;

  fromResponse: (res: AxiosResponse<any>) => T;
}
