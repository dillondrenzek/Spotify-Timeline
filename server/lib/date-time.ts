import { DateTime } from 'luxon';

/**
 * Returns a tuple of minimum and maximum `DateTime` objects from a range
 */
export function getMinMaxDateTime(dates: DateTime[]): [DateTime, DateTime] {
  if (!dates || dates.length === 0) {
    return [null, null];
  }

  return [DateTime.min(...dates), DateTime.max(...dates)];
}
