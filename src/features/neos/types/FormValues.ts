/**
 * @type FormValues - Form values captured from the date range picker.
 *  @property startDate - Selected start date in YYYY-MM-DD format.
 *  @property endDate - Optional end date in YYYY-MM-DD format.
 */

export type FormValues = {
  startDate: string;
  endDate?: string;
};
