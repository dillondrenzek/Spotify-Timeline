export interface ApiError {
  /**
   * @example 'Player command failed: No active device found'
   */
  message: string;
  /**
   * @example 'NO_ACTIVE_DEVICE'
   */
  reason: string;
}

export class ApiError extends Error {
  reason: string;
  message: string;

  constructor(err?: { reason: string; message: string }) {
    super(null);
    this.message = err.message;
    this.reason = err.reason;
    this.name = err.reason;
  }

  static isApiError = isApiError;
  static fromError = fromError;
  static fromAny = fromAny;
}

/**
 * Type guard for `ApiError`
 */
export function isApiError(value: unknown): value is ApiError {
  if (!value) {
    return false;
  }
  return (
    value instanceof ApiError ||
    (typeof value === 'object' && 'reason' in value)
  );
}

/**
 * Convert an `Error`-like object into an `ApiError`
 */
export function fromError<IError extends Error>(err: IError): ApiError {
  return new ApiError({ reason: err.name, message: err.message });
}

/**
 * Convert any value to an `ApiError`
 */
export function fromAny(err: any): ApiError {
  if (err instanceof ApiError) {
    return err;
  }

  if (err instanceof Error) {
    return ApiError.fromError(err);
  }

  return new ApiError({ reason: 'UNKNOWN', message: 'Unknown error.' });
}
