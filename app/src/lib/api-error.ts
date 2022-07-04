export interface ApiError {
  /**
   * @example 404
   */
  status: number;
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
  status: number;

  reason: string;

  message: string;

  constructor(err?: ApiError) {
    super(err.message);
    this.message = err.message;
    this.status = err.status;
    this.reason = err.reason;
    this.name = err.reason;
  }

  static isApiError = isApiError;
}

export function isApiError(value: unknown): value is ApiError {
  return (
    value instanceof ApiError ||
    (typeof value === 'object' && 'status' in value)
  );
}
