import { Units } from '../types/Units';

/**
 * @function formatMeters
 * Formats a number of meters into a localized string with "m" suffix.
 *
 * @param m - Distance in meters.
 * @returns Human-readable string, e.g. `"432 m"`.
 */
const formatMeters = (m: number) => `${m.toLocaleString()} m`;

const formatFeet = (ft: number) => `${ft.toLocaleString()} ft`;

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

const formatMiles = (miles: number) => `${miles.toLocaleString()} miles`;

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
const formatKmPerSec = (v: number) => `${v.toLocaleString()} km/h`;
const formatMilesPerHour = (mph: number) => `${mph.toLocaleString()} mph`;

export const formatVelocity = (velocity: number, unit: Units) => {
  return unit === 'metric' ? formatKmPerSec(velocity) : formatMilesPerHour(velocity * 0.621371);
};
