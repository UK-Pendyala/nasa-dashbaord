import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Converts an RTK Query error object into a human-readable message.
 *
 * Handles both `FetchBaseQueryError` (network/HTTP errors) and
 * `SerializedError` (runtime/JS errors). Falls back to `"Unknown error"`
 * if no useful information is found.
 *
 * @param error - The error object returned by RTK Query or thrown in code.
 * @returns A user-friendly string suitable for displaying in the UI.
 */
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