import getEventsGroupByOverlapping from '../getEventsGroupByOverlapping';
import getEventsWithOverlappingPositions from '../getEventsWithOverlappingPositions';
import getEventsWithTimes from '../getEventsWithTimes';

const formatEvents = (events) => {
  const eventsWithTimes = getEventsWithTimes(events);
  const eventsGroupByOverlapping = getEventsGroupByOverlapping(eventsWithTimes);
  const eventsWithOverlappingPositions =
    getEventsWithOverlappingPositions(eventsGroupByOverlapping);

  return eventsWithOverlappingPositions;
};

export default formatEvents;
