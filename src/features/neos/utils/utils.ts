import { Units } from '../types/Units';

/**
 * @function formatMeters
 * Formats a number of meters into a localized string with "m" suffix.
 *
 * @param m - Distance in meters.
 * @returns Human-readable string, e.g. `"432 m"`.
 */
const formatMeters = (m: number) => `${m.toLocaleString()} m`;

/**
 * @function formatFeet
 * Formats a distance value in feet into a localized string with "ft" suffix.
 *
 * @param ft - Distance in feet.
 * @returns A formatted string, e.g., "1,234 ft".
 */
const formatFeet = (ft: number) => `${ft.toLocaleString()} ft`;

/**
 * @function formatSize
 * Formats a size value based on the specified unit system.
 *
 * @param size - The size value to be formatted.
 * @param unit - The unit system to use for formatting ('metric' or other).
 * @returns A formatted string representing the size in meters or feet.
 */
export const formatSize = (size: number, unit: Units) => {
  return unit === 'metric' ? formatMeters(size) : formatFeet(size);
};

/**
 * @function formatKm
 * Formats a number of kilometers into a localized string with "km" suffix.
 *
 * @param km - Distance in kilometers.
 * @returns Human-readable string, e.g. `"10 km"`.
 */
const formatKm = (km: number) => `${km.toLocaleString()} km`;

/**
 * @function formatMiles
 * Formats a number of miles into a localized string with "miles" suffix.
 *
 * @param miles - Distance in miles.
 * @returns Human-readable string, e.g. `"1,234 miles"`.
 */
const formatMiles = (miles: number) => `${miles.toLocaleString()} miles`;

/**
 * @function formatCloseness
 * Formats a closeness value based on the specified unit system.
 *
 * @param closeness - The closeness value to be formatted.
 * @param unit - The unit system to use for formatting ('metric' or other).
 * @returns A formatted string representing the closeness in kilometers or miles.
 */
export const formatCloseness = (closeness: number, unit: Units) => {
  return unit === 'metric' ? formatKm(closeness) : formatMiles(closeness);
};

/**
 * @function formatKmPerSec
 * Formats a velocity into a localized string with "km/s" suffix.
 *
 * @param v - Velocity in kilometers per second.
 * @returns Human-readable string, e.g. `"33.8 km/s"`.
 */
const formatKmPerHour = (v: number) => `${v.toLocaleString()} km/h`;

/**
 * @function formatMilesPerHour
 * Formats a speed value in miles per hour into a localized string with "mph" suffix.
 *
 * @param mph - Speed in miles per hour.
 * @returns A formatted string, e.g., "1,234 mph".
 */
const formatMilesPerHour = (mph: number) => `${mph.toLocaleString()} mph`;

/**
 * @function formatVelocity
 * Formats a velocity value based on the specified unit system.
 *
 * @param velocity - The relative velocity value to be formatted.
 * @param unit - The unit system to use for formatting ('metric' or other).
 * @returns A formatted string representing the velocity in kilometers per hour or miles per hour.
 */
export const formatVelocity = (velocity: number, unit: Units) => {
  return unit === 'metric' ? formatKmPerHour(velocity) : formatMilesPerHour(velocity * 0.621371);
};
