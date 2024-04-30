import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Board from "./components/Board";
import FullCol from "./components/FullCol";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Board} />
        <Route path="/column/:id" component={FullCol} />
      </Routes>
    </Router>
  );
};

export default App;
