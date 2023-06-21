/* eslint-disable no-param-reassign */
import { DURATION_DAY, HOURS } from './time';

export const getStartedMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((value) => parseInt(value, 10));
  const originalStartMinutes = HOURS(hours).inMinutes + minutes;
  const startMinutes = originalStartMinutes - DURATION_DAY.inMinutes;

  return {
    originalStartMinutes,
    startMinutesByScreen: Math.round((startMinutes * window.innerHeight) / DURATION_DAY.inMinutes)
  };
};

const computeDuration = (duration) =>
  Math.round((duration * window.innerHeight) / DURATION_DAY.inMinutes);

const getAppointmentsWithTimes = (appointments) =>
  appointments
    .reduce((acc, appointment) => {
      const duration = computeDuration(appointment.duration);
      const { originalStartMinutes, startMinutesByScreen } = getStartedMinutes(appointment.start);
      const end = startMinutesByScreen + duration;
      const appointmentIsInSchedule =
        originalStartMinutes >= DURATION_DAY.inMinutes &&
        originalStartMinutes + appointment.duration <= HOURS(18).inMinutes;

      if (appointmentIsInSchedule) {
        acc.push({
          ...appointment,
          start: startMinutesByScreen,
          end,
          duration
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.start - b.start);

const hasOverlapping = ({ appointmentsGroup, appointment }) =>
  appointmentsGroup.some((a) => a.end > appointment.start && a.start < appointment.end);

const getAppointmentsGroupByOverlapping = (appointments) =>
  appointments.reduce((acc, appointment) => {
    if (acc.some((appointmentsGroup) => hasOverlapping({ appointmentsGroup, appointment }))) {
      const index = acc.findIndex((appointmentsGroup) =>
        hasOverlapping({ appointmentsGroup, appointment })
      );
      acc[index].push(appointment);
    } else {
      acc.push([appointment]);
    }

    return acc;
  }, []);

const getAppointmentsWithPositions = (appointments) =>
  appointments.map((appointmentsGroup) =>
    appointmentsGroup.map((appointment, index) => {
      const width = 100 / appointmentsGroup.length;
      const left = index === 0 ? 0 : width * index;

      return {
        ...appointment,
        width,
        left
      };
    })
  );

const getAppointmentsWithMergedOverlapping = (appointments) =>
  appointments.map((appointmentsGroup) => {
    // eslint-disable-next-line no-unused-vars
    let column = appointmentsGroup.length;
    return appointmentsGroup.map((appointment, index) => {
      if (appointmentsGroup.length > 2) {
        appointmentsGroup.forEach((appointmentToCheck) => {
          const prevPosition = Math.abs(appointment.left - appointment.width);

          if (appointment.start >= appointmentToCheck.end && !appointment.hasMoved) {
            const appointmentsOnSamePosition = appointmentsGroup.filter(
              (app) => app.left === appointmentToCheck.left
            );
            if (!appointmentsOnSamePosition.some((event) => event.end > appointment.start)) {
              appointment.left = appointmentToCheck.left;
              appointment.hasMoved = true;
              column -= 1;
            } else if (
              !appointmentsGroup.some((event) => event.left === prevPosition) &&
              !appointment.hasMoved
            ) {
              appointment.left = prevPosition;
            }
          }
        });

        if (appointmentsGroup.length === index + 1 && appointmentsGroup.length > 2) {
          appointmentsGroup.forEach((app) => {
            const prevWidth = app.width;
            const prevLeft = app.left;
            const newWidth = 100 / column;

            app.width = newWidth;
            app.left = (newWidth * prevLeft) / prevWidth;
          });
        }
      }

      return appointment;
    });
  });

export const formatEvents = (appointments) => {
  const appointmentsWithTimes = getAppointmentsWithTimes(appointments);
  const appointmentsGroupByOverlapping = getAppointmentsGroupByOverlapping(appointmentsWithTimes);
  const appointmentsWithPositions = getAppointmentsWithPositions(appointmentsGroupByOverlapping);
  const appointmentsWithMergedOverlapping =
    getAppointmentsWithMergedOverlapping(appointmentsWithPositions);

  return appointmentsWithMergedOverlapping;
};
