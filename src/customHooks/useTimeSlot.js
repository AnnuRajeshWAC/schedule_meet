import { useFieldState } from "informed";
import { useCalendarData } from "./useCalendarData";

export const useTimeslot = (slot, event) => {
  const { events } = useCalendarData();

  const formattedDate = slot.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const { value: start } = useFieldState("start");
  const { value: cabin } = useFieldState("room");
  const { value: end } = useFieldState("end");

  const e = event
    ? events
        .filter((item) => item !== event)
        .map((item) => ({
          start: item.start,
          end: item.end,
          cabin: item.room,
        }))
    : events.map((item) => ({
        start: item.start,
        end: item.end,
        cabin: item.room,
      }));
  const startdate = new Date(`${formattedDate},${start}`);
  const enddate = new Date(`${formattedDate},${end}`);

  const ev = e.filter((i) => i.cabin === Number(cabin));
  const isOverlappingDates = ev?.some((d) => {
    const eventStart = new Date(d.start);
    const eventEnd = new Date(d.end);

    return startdate < eventEnd && enddate > eventStart;
  });
  const cabinValidation = (value) => {
    if (value) {
      if (isOverlappingDates) {
        return `selected slot not availble in conference room ${cabin}`;
      }
    }
  };

  const validation = (value) => {
    const date = new Date(`${formattedDate},${value}`);

    const isOverlapping =
      ev?.some((d) => date >= new Date(d.start) && date <= new Date(d.end)) ||
      ev?.some((d) => new Date(d.start) >= date && new Date(d.end) <= date);

    if (cabin) {
      // if (isOverlapping) {
      //   return `the time slot in conference room ${cabin} is already booked`;
      // } 
       if (date < new Date()) { 
        return "enter valid time";
      } else if (isOverlappingDates) {
        return "slot not availble";
      }
    }
  };
  return { start, cabin, validation, isOverlappingDates, cabinValidation };
};
