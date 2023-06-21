/**
 * Represents a duration in milliseconds.
 *
 * @param {number} [value=1] - The value representing the duration in milliseconds.
 * @returns {Object} - An object with conversions to minutes, seconds, and milliseconds.
 */
export const MILLISECONDS = (value = 1) => ({
  inMinutes: value / 60000,
  inSeconds: value / 1000,
  inMilliseconds: value
});

export const SECONDS = (value = 1) => MILLISECONDS(value * 1000);

export const MINUTES = (value = 1) => SECONDS(value * 60);

export const HOURS = (value = 1) => MINUTES(value * 60);

export const DURATION_DAY = HOURS(12).inMinutes;

export const MIN_MINUTES = HOURS(9).inMinutes;

export const MAX_MINUTES = HOURS(21).inMinutes;
