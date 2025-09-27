export type SortKey =
  | 'sizeMeters'
  | 'closenessKm'
  | 'relativeVelocityKmH'
  | 'sizeFeet'
  | 'closenessMiles'
  | 'relativeVelocityMiH';

export type Order = 'asc' | 'desc';

/**
 * Creates a comparator function for sorting an array based on a specified key and order.
 *
 * @param order - The order of sorting, either 'asc' for ascending or 'desc' for descending.
 * @param orderBy - The key of the object to sort by.
 * @returns A comparator function that can be used with array sorting methods.
 *
 */
export function getComparator(order: Order, orderBy: string) {
  return (a: any, b: any): number => {
    if (order === 'desc') {
      return b[orderBy] - a[orderBy];
    } else {
      return a[orderBy] - b[orderBy];
    }
  };
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
