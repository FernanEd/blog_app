import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";
import Adminpage from "./views/Adminpage";
import Homepage from "./views/Homepage";
import Loginpage from "./views/Loginpage";
import Postpage from "./views/Postpage";
import AddPostpage from "./views/AddPostpage";
import EditPostpage from "./views/EditPostpage";
import { IUser } from "./utils/interfaces";
import { SERVER_URL } from "./utils/constants";

export const currentUserContext = React.createContext({
  id: "",
  token: "",
  isLogged: false,
  logout: () => {},
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserID, setCurrentUserID] = useState<string>("");
  const [jwt, setJwt] = useState("");

  const logUser = (user: string, token: string) => {
    setCurrentUserID(user);
    setJwt("Bearer " + token);
    setLoggedIn(true);
  };

  const logOut = () => {
    setCurrentUserID("");
    setJwt("");
    setLoggedIn(false);
  };

  return (
    <>
      <currentUserContext.Provider
        value={{
          id: currentUserID,
          token: jwt,
          isLogged: loggedIn,
          logout: logOut,
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Homepage />
            </Route>
            <Route path="/posts/:id">
              <Postpage />
            </Route>
            <Route path="/login">
              <Loginpage logUser={logUser} />
            </Route>
            <Route path="/admin" exact={true}>
              {loggedIn ? <Adminpage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/admin/addpost" exact={true}>
              {loggedIn ? <AddPostpage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/admin/editpost/:id" exact={true}>
              {loggedIn ? <EditPostpage /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </currentUserContext.Provider>
    </>
  );
}

export default App;
