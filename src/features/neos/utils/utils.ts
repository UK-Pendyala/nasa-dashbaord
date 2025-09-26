/**
 * @function formatMeters
 * Formats a number of meters into a localized string with "m" suffix.
 *
 * @param m - Distance in meters.
 * @returns Human-readable string, e.g. `"432 m"`.
 */
export const formatMeters = (m: number) => `${m.toLocaleString()} m`;

/**
 * @function formatKm
 * Formats a number of kilometers into a localized string with "km" suffix.
 *
 * @param km - Distance in kilometers.
 * @returns Human-readable string, e.g. `"10 km"`.
 */
export const formatKm = (km: number) => `${km.toLocaleString()} km`;

/**
 * @function formatKmPerSec
 * Formats a velocity into a localized string with "km/s" suffix.
 *
 * @param v - Velocity in kilometers per second.
 * @returns Human-readable string, e.g. `"33.8 km/s"`.
 */
export const formatKmPerSec = (v: number) => `${v.toLocaleString()} km/s`;
