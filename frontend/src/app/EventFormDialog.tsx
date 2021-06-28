import { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { createEventEndpoint, ICalendar, IEditingEvent } from "./backend";

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}

interface IValidationErrors {
  [field: string]: string;
}

export function EventFormDialog(props: IEventFormDialogProps) {
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);
  const [errors, setErrors] = useState<IValidationErrors>({});

  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setEvent(props.event);
  }, [props.event]);

  function validateEvent(): boolean {
    if (!event) return false;

    const currentErrors: IValidationErrors = {};

    if (!event.date) {
      currentErrors["date"] = "Data deve ser preenchida";
      inputDate.current?.focus();
    }
    if (!event.desc) {
      currentErrors["desc"] = "Descrição deve ser preenchida";
      inputDesc.current?.focus();
    }

    setErrors(currentErrors);

    return Object.keys(currentErrors).length === 0;
  }

  function save(evt: React.FormEvent) {
    evt.preventDefault();
    if (validateEvent()) {
      createEventEndpoint(event!).then(props.onSave);
    }
  }

  return (
    <div>
      <Dialog open={!!event} onClose={props.onCancel} aria-labelledby="form-dialog-title">
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">Criar evento</DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  inputRef={inputDate}
                  type="date"
                  margin="normal"
                  label="Data"
                  value={event.date}
                  fullWidth
                  onChange={(evt) => setEvent({ ...event, date: evt.target.value })}
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  inputRef={inputDesc}
                  autoFocus
                  margin="normal"
                  label="Descrição"
                  fullWidth
                  value={event.desc}
                  onChange={(evt) => setEvent({ ...event, desc: evt.target.value })}
                  error={!!errors.desc}
                  helperText={errors.desc}
                />
                <TextField
                  type="time"
                  margin="normal"
                  label="Hora"
                  value={event.time ?? ""}
                  fullWidth
                  onChange={(evt) => setEvent({ ...event, time: evt.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel id="select-calendar">Agenda</InputLabel>
                  <Select
                    labelId="select-calendar"
                    value={event.calendarId}
                    onChange={(evt) =>
                      setEvent({ ...event, calendarId: evt.target.value as number })
                    }
                  >
                    {props.calendars.map((calendar) => (
                      <MenuItem key={calendar.id} value={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={props.onCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
