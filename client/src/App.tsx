import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Adminpage from "./views/Adminpage";
import Homepage from "./views/Homepage";
import Loginpage from "./views/Loginpage";
import Postpage from "./views/Postpage";
import NewPostpage from "./views/NewPostpage";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

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
          <Route path="/login">
            <Loginpage />
          </Route>
          <Route path="/admin" exact={true}>
            {loggedIn ? <Adminpage /> : <Loginpage />}
          </Route>
          <Route path="/admin/newpost" exact={true}>
            {loggedIn ? <NewPostpage /> : <Loginpage />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
