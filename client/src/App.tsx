import React, { useContext, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        return;
      }

      const user: { id: string; token: string } = JSON.parse(storedUser);
      try {
        let res = await fetch(`${SERVER_URL}/verify`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        if (res.status === 200) {
          logUser(user.id, user.token);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const logUser = (user: string, token: string) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user,
        token: token,
      })
    );
    setCurrentUserID(user);
    setJwt("Bearer " + token);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem("user");
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
            {isLoading ? (
              <p>Loading...</p>
            ) : loggedIn ? (
              <>
                <Route path="/admin" exact={true}>
                  <Adminpage />
                </Route>
                <Route path="/admin/addpost" exact={true}>
                  <AddPostpage />
                </Route>
                <Route path="/admin/editpost/:id" exact={true}>
                  <EditPostpage />
                </Route>{" "}
              </>
            ) : (
              <Loginpage logUser={logUser} />
            )}
          </Switch>
        </Router>
      </currentUserContext.Provider>
    </>
  );
}

export default App;
