import getStartedMinutes from '../getStartedMinutes';
import { MIN_MINUTES, DURATION_DAY, MAX_MINUTES } from '../time';

const getEventsWithTimes = (events) =>
  events
    .reduce((acc, event) => {
      const duration = Math.round((event.duration * window.innerHeight) / DURATION_DAY);
      const { originalStartMinutes, startMinutesByScreen } = getStartedMinutes(event.start);
      const end = startMinutesByScreen + duration;
      const eventIsInSchedule =
        originalStartMinutes >= MIN_MINUTES && originalStartMinutes + event.duration <= MAX_MINUTES;

      if (eventIsInSchedule) {
        acc.push({
          ...event,
          start: startMinutesByScreen,
          end,
          duration
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.start - b.start);

export default getEventsWithTimes;
