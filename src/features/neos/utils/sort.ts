export type SortKey = 'sizeMeters' | 'closenessKm' | 'relativeVelocityKmS';
export type Order = 'asc' | 'desc';

/**
 * Compares two objects by a given numeric key in descending order.
 *
 * @param a - First object to compare.
 * @param b - Second object to compare.
 * @param orderBy - Property key to sort by.
 * @returns Negative if `a < b`, positive if `a > b`, 0 if equal.
 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aVal = a[orderBy] as unknown as number;
  const bVal = b[orderBy] as unknown as number;
  if (bVal < aVal) return -1;
  if (bVal > aVal) return 1;
  return 0;
}

/**
 * Returns a comparator function based on sort order and key.
 *
 * @param order - Sort order (`asc` or `desc`).
 * @param orderBy - Property key to sort by.
 * @returns A comparator suitable for Array.prototype.sort.
 */
export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number }, b: { [key in Key]: number }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Performs a stable sort on an array.
 * Maintains original order when values compare equal.
 *
 * @param array - Array of items to sort.
 * @param comparator - Comparator function.
 * @returns A new sorted array.
 */
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilized = array.map((el, index) => [el, index] as const);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}
