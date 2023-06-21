const hasOverlapping = ({ eventsGroup, event }) =>
  eventsGroup.some((a) => a.end > event.start && a.start < event.end);

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
