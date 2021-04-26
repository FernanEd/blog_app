import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Homepage from "./views/Homepage";
import Postpage from "./views/Postpage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Homepage />
          </Route>
          <Route path="/posts/:id">
            <Postpage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
