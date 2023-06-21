import { MIN_MINUTES, HOURS, DURATION_DAY } from '../time';

/**
 * Computes the start and end minutes for a given time.
 *
 * @param {string} time - The time value in the format "HH:mm".
 * @returns {Object} - An object containing the original start minutes and the start minutes adjusted for the screen height.
 */
const getStartedMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((value) => parseInt(value, 10));
  const originalStartMinutes = HOURS(hours).inMinutes + minutes;
  const startMinutes = originalStartMinutes - MIN_MINUTES;

  return {
    originalStartMinutes,
    startMinutesByScreen: Math.round((startMinutes * window.innerHeight) / DURATION_DAY)
  };
};

export default getStartedMinutes;
