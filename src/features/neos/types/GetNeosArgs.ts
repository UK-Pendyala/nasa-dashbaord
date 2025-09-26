/**
 * Shared type definitions for the NEO (Near-Earth Object) dashboard.
 *
 * @type GetNeosArgs - Parameters for querying NEOs from the backend.
 *   @property startDate - Required start date in YYYY-MM-DD format.
 *   @property endDate - Optional end date in YYYY-MM-DD format.
 */
export type GetNeosArgs = {
  startDate: string;
  endDate?: string;
};
