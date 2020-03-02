import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
import history from "./utility/history";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null
  });

  const { isAuthenticated, user } = state;

  const setAuthStatus = authenticated => {
    setState({ ...state, isAuthenticated: authenticated });
  };
  const setUser = user => {
    setState({ ...state, user: user });
  };

  const authProps = {
    isAuthenticated: isAuthenticated,
    user: user,
    setAuthStatus: setAuthStatus,
    setUser: setUser
  };
  useEffect(() => {
    // Init materailize js
    M.AutoInit();
  });
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Contact {...props} auth={authProps} />}
          />
          <Route
            exact
            path="/signin"
            render={props => <SignIn {...props} auth={authProps} />}
          />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} auth={authProps} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
