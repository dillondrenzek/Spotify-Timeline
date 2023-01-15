export type ErrorHandler<T = void> = (err: any) => T | PromiseLike<T>;

export const baseErrorHandler: ErrorHandler = function baseErrorHandler(err) {
  console.error('[ERROR]', err);
  console.log({ ...err });
  console.log(err.toString(), err instanceof Error);
};
