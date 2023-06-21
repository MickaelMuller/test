import getEventsGroupByOverlapping from '../getEventsGroupByOverlapping';
import getEventsWithOverlappingPositions from '../getEventsWithOverlappingPositions';
import getEventsWithTimes from '../getEventsWithTimes';

/**
 * Formats events by applying various transformations.
 *
 * @param {Array<Object>} events - An array of objects representing the events.
 * @returns {Array<Object>} - An array of formatted events with additional information.
 */
const formatEvents = (events) => {
  const eventsWithTimes = getEventsWithTimes(events);
  const eventsGroupByOverlapping = getEventsGroupByOverlapping(eventsWithTimes);
  const eventsWithOverlappingPositions =
    getEventsWithOverlappingPositions(eventsGroupByOverlapping);

  return eventsWithOverlappingPositions;
};

export default formatEvents;
