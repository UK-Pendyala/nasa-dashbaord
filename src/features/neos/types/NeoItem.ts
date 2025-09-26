/**
 *
 * @type NeoItem - Represents a single Near-Earth Object (NEO) returned by the NASA backend.
 *  @property id - Unique NASA/JPL identifier.
 *  @property name - Display name or provisional designation of the object.
 *  @property sizeMeters - Estimated size of the object in meters.
 *  @property closenessKm - Closest approach distance to Earth in kilometers.
 *  @property relativeVelocityKmS - Relative velocity during approach in kilometers per second.
 *  @property hazardous - Flag indicating if the object is considered potentially hazardous.
 */
export type NeoItem = {
  id: string;
  name: string;
  sizeMeters: number;
  closenessKm: number;
  relativeVelocityKmS: number;
  hazardous: boolean;
};
