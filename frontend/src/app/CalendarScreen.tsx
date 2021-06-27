import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from "./backend";
import { useParams } from "react-router-dom";
import { CalendarsView } from "./CalendarsView";
import CalendarHeader from "./CalendarHeader";
import { Calendar, ICalendarCell, IEventWithCalendar } from "./Calendar";

export function CalendarScreen() {
  const { month } = useParams<{ month: string }>();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
  const weeks = generateCalendar(`${month}-01`, events, calendars, calendarsSelected);
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([getCalendarsEndpoint(), getEventsEndpoint(firstDate, lastDate)]).then(
      ([calendars, events]) => {
        setCalendarsSelected(calendars.map(() => true));
        setCalendars(calendars);
        setEvents(events);
      }
    );
  }, [firstDate, lastDate]);

  function toggleCalendar(i: number) {
    const newValues = [...calendarsSelected];
    newValues[i] = !newValues[i];
    setCalendarsSelected(newValues);
  }

  return (
    <Box display="flex" component="div" height="100%" alignItems="stretch">
      <Box borderRight="1px solid rgb(224,224,224)" width="12em" padding="8px 16px">
        <h2>Agenda React</h2>
        <Button variant="contained" color="primary">
          Novo evento
        </Button>
        <CalendarsView
          calendars={calendars}
          toggleCalendar={toggleCalendar}
          calendarsSelected={calendarsSelected}
        />
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month} />
        <Calendar weeks={weeks} />
      </Box>
    </Box>
  );
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  allCalendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(`${date}T12:00:00`);
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calIndex = allCalendars.findIndex((cal) => cal.id === event.calendarId);
          if (calendarsSelected[calIndex]) {
            events.push({ ...event, calendar: allCalendars[calIndex] });
          }
        }
      }

      week.push({
        date: isoDate,
        dayOfMonth: currentDay.getDate(),
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}
