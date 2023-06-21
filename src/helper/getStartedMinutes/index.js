import { MIN_MINUTES, HOURS, DURATION_DAY } from '../time';

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
