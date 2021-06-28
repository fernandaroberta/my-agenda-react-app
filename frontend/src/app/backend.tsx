export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
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

export async function createEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  const res = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return res.json();
}

export async function updateEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  const res = await fetch(`http://localhost:8080/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return res.json();
}

export async function deleteEventEndpoint(eventId: number): Promise<void> {
  const res = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
  });
  return res.json();
}
