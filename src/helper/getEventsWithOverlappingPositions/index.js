const getEventsWithOverlappingPositions = (events) =>
  events.map((eventsGroup) => {
    let column = eventsGroup.length;

    return eventsGroup.map((event, index) => {
      // set base left and width for every event
      const width = 100 / eventsGroup.length;
      const left = index === 0 ? 0 : width * index;
      event.width = width;
      event.left = left;

      const moreThanTwoEvents = eventsGroup.length > 2;

      if (moreThanTwoEvents) {
        eventsGroup.forEach((eventToCheck) => {
          const prevPosition = Math.abs(event.left - event.width);

          if (event.start >= eventToCheck.end && !event.hasMoved) {
            const eventsOnSamePosition = eventsGroup.filter(
              (app) => app.left === eventToCheck.left
            );
            if (
              !eventsOnSamePosition.some(
                (eventOnSamePosition) => eventOnSamePosition.end > event.start
              )
            ) {
              event.left = eventToCheck.left;
              event.hasMoved = true;
              column -= 1;
            } else if (!eventsGroup.some((e) => e.left === prevPosition) && !event.hasMoved) {
              event.left = prevPosition;
            }
          }
        });

        // check if we are at the last element of overlapping group for re compute width and left for each
        if (eventsGroup.length === index + 1 && moreThanTwoEvents) {
          eventsGroup.forEach((e) => {
            const prevWidth = e.width;
            const prevLeft = e.left;
            const newWidth = 100 / column;

            e.width = newWidth;
            e.left = (newWidth * prevLeft) / prevWidth;
          });
        }
      }

      return event;
    });
  });

export default getEventsWithOverlappingPositions;
