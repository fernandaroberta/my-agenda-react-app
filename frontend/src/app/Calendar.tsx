import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ICalendar, IEvent } from "./backend";
import { WatchLater } from "@material-ui/icons";
import React from "react";

const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const useStyles = makeStyles({
  table: {
    borderTop: "1px solid rgb(224,224,224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, th ~ th": {
      borderLeft: "1px solid rgb(224,224,224)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfMonth: {
    fontWeight: 500,
    marginBottom: "4px",
  },
  event: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px 4px",
    borderRadius: "4px",
  },
});

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

export function Calendar(props: ICalendarProps) {
  const { weeks } = props;

  const classes = useStyles();

  function handleClick(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      props.onClickDay(date);
    }
  }

  return (
    <TableContainer style={{ flex: 1 }} component="div">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((d) => {
              return (
                <TableCell align="center" key={d}>
                  {d}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => {
            return (
              <TableRow key={i}>
                {week.map((cell) => {
                  return (
                    <TableCell
                      align="center"
                      key={cell.date}
                      onClick={(me) => handleClick(me, cell.date)}
                    >
                      <div className={classes.dayOfMonth}>{cell.dayOfMonth}</div>
                      {cell.events.map((event) => {
                        const color = event.calendar.color;

                        return (
                          <button
                            key={event.id}
                            className={classes.event}
                            onClick={() => props.onClickEvent(event)}
                          >
                            {event.time && (
                              <>
                                <WatchLater fontSize="inherit" style={{ color }} />
                                <Box component="span" margin="0 4px">
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? (
                              <span>{event.desc}</span>
                            ) : (
                              <span
                                className={classes.eventBackground}
                                style={{ backgroundColor: color }}
                              >
                                {event.desc}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}
