import express from 'express';

export interface BaseRequest<T> {
  isValid: (value: unknown) => value is T;

  fromRequest: (req: express.Request) => T;
}
