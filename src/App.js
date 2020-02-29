import React, { useEffect } from "react";
import Contact from './pages/Contact'
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

function App() {
  useEffect(() => {
    // Init materailize js
    M.AutoInit();
  });
  return <div className="App">
    <Contact/>
  </div>;
}

export default App;
