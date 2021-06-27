import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ICalendar } from "./backend";

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  calendarsSelected: boolean[];
}

export function CalendarsView(props: ICalendarsViewProps) {
  const { calendars, toggleCalendar, calendarsSelected } = props;

  return (
    <Box marginTop="64px">
      <h3>Agendas</h3>
      {calendars.map((calendar, i) => (
        <div key={calendar.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={calendarsSelected[i]}
                style={{ color: calendar.color }}
                onChange={() => toggleCalendar(i)}
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
}
