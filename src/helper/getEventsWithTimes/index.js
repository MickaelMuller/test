import getStartedMinutes from '../getStartedMinutes';
import { DURATION_DAY, HOURS } from '../time';

const getEventsWithTimes = (events) =>
  events
    .reduce((acc, event) => {
      const duration = Math.round((event.duration * window.innerHeight) / DURATION_DAY);
      const { originalStartMinutes, startMinutesByScreen } = getStartedMinutes(event.start);
      const end = startMinutesByScreen + duration;
      const eventIsInSchedule =
        originalStartMinutes >= DURATION_DAY &&
        originalStartMinutes + event.duration <= HOURS(18).inMinutes;

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
