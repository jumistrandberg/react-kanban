import React from "react";
import {Routes, Route} from "react-router-dom";

import "./App.css";
import Board from "./components/Board";
import FullCol from "./components/FullCol";
import Card from "./components/Card";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Board/>} />
        <Route path="/column/:id" element={<FullCol/>} />
        <Route path="card/:id" element={<Card/>} />
      </Routes>
  );
};

export default App;
