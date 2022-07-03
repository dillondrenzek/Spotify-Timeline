export interface ApiError {
  status: number;
  message: string;
  reason: string;
  //   status: 404,
  //   message: 'Player command failed: No active device found',
  //   reason: 'NO_ACTIVE_DEVICE'
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    'status' in value &&
    'message' in value &&
    'reason' in value
  );
}
