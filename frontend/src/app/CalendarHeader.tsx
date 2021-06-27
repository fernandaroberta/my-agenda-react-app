import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { addMonths, formatMonth } from "./dateFunctions";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

interface ICalendarHeaderProps {
  month: string;
}

export default function CalendarHeader(props: ICalendarHeaderProps) {
  const { month } = props;
  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <Box>
        <IconButton
          aria-label="Previous month"
          component={Link}
          to={`/calendar/${addMonths(month, -1)}`}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="Next month"
          component={Link}
          to={`/calendar/${addMonths(month, 1)}`}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box flex="1" component="h3" marginLeft="16px">
        {formatMonth(month)}
      </Box>
      <IconButton aria-label="user">
        <Avatar>
          <PersonIcon />
        </Avatar>
      </IconButton>
    </Box>
  );
}
