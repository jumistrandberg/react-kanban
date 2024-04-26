import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import Board from "./components/Board";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Board} />
        <Route path="/column/:id" component={FullCol} />

      </Switch>
    </Router>
  );
};

export default App;
