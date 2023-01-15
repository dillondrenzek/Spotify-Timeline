export type ErrorHandler<T = void> = (err: any) => T | PromiseLike<T>;
