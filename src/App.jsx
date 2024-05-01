import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Board from "./components/Board";
import FullColPage from "./pages/FullColPage";
import Card from "./components/Card";
import { DataProvider } from "./components/DataContext";

const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/column/:id" element={<FullColPage />} />
        <Route path="/card/:id" element={<Card />} />
      </Routes>
    </DataProvider>
  );
};

export default App;
