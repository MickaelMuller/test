const hasOverlapping = ({ eventsGroup, event }) =>
  eventsGroup.some((a) => a.end > event.start && a.start < event.end);

/**
 * Groups events based on overlapping.
 *
 * @param {Array<Object>} events - An array of objects representing the events.
 * @returns {Array<Array<Object>>} - An array containing groups of overlapping events.
 */
const getEventsGroupByOverlapping = (events) =>
  events.reduce((acc, event) => {
    if (acc.some((eventsGroup) => hasOverlapping({ eventsGroup, event }))) {
      const index = acc.findIndex((eventsGroup) => hasOverlapping({ eventsGroup, event }));
      acc[index].push(event);
    } else {
      acc.push([event]);
    }

    return acc;
  }, []);

export default getEventsGroupByOverlapping;
