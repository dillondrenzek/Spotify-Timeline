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
}

export function isApiError(value: unknown): value is ApiError {
  return (
    value instanceof ApiError ||
    (typeof value === 'object' && 'reason' in value)
  );
}
