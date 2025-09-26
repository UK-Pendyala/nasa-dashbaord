import { NeoItem } from "./NeoItem";

/**
 * 
 * @type NeosResponse - API response payload for NEO data.
 *  @property startDate - Query start date.
 *  @property endDate - Query end date.
 *  @property count - Total number of NEOs returned.
 *  @property items - List of NEO items normalized for UI.
 */
export type NeosResponse = {
  startDate: string;
  endDate: string;
  count: number;
  items: NeoItem[];
};