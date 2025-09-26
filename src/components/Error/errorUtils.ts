import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function toMessage(error: unknown): string {
  const e = error as FetchBaseQueryError | SerializedError | undefined;
  if (!e) return 'Unknown error';
  if ('status' in e) {
    if (typeof e.data === 'string') return e.data;
    if (e.data && typeof e.data === 'object' && 'message' in (e.data as any)) {
      return String((e.data as any).message);
    }
    return `Request failed with status ${e.status as any}`;
  }
  if ((e as any)?.message) return String((e as any).message);
  return 'Unknown error';
}