import { NeoItem } from "./NeoItem";

export type NeosResponse = {
  startDate: string;
  endDate: string;
  count: number;
  items: NeoItem[];
};