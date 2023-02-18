/**
 * Format date value as LocaleDateString
 * @param value
 * @returns
 */
export function formatDate(value: string): string {
  return new Date(Date.parse(value)).toLocaleDateString();
}
