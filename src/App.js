import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

function App() {
  useEffect(() => {
    // Init materailize js
    M.AutoInit();
  });
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Contact} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
