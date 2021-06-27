export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export async function getCalendarsEndpoint(): Promise<ICalendar[]> {
  const res = await fetch("http://localhost:8080/calendars");
  return res.json();
}

export async function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
  const res = await fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&sort=date,time`
  );
  return res.json();
}
