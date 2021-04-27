import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import Adminpage from "./views/Adminpage";
import Homepage from "./views/Homepage";
import Loginpage from "./views/Loginpage";
import Postpage from "./views/Postpage";
import AddPostpage from "./views/AddPostpage";

export const currentUserContext = React.createContext<string>("");

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUserID, setCurrentUserID] = useState<string>(
    "6085d9f8b496781934ea4d4c"
  );

  return (
    <>
      <currentUserContext.Provider value={currentUserID}>
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
              {loggedIn ? <Adminpage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/admin/addpost" exact={true}>
              {loggedIn ? <AddPostpage /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </currentUserContext.Provider>
    </>
  );
}

export default App;
