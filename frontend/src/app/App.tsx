import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { getToday } from "./dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint } from "./backend";
import { LoginScreen } from "./LoginScreen";

function App() {
  const month = getToday().substring(0, 7);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    getUserEndpoint().then(
      () => setHasSession(true),
      () => setHasSession(false)
    );
  }, []);

  if (hasSession) {
    return (
      <Router>
        <Switch>
          <Route path="/calendar/:month">
            <CalendarScreen />
          </Route>
          <Redirect to={{ pathname: `/calendar/${month}` }} />
        </Switch>
      </Router>
    );
  } else {
    return <LoginScreen />;
  }
}

export default App;
