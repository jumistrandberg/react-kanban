import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./components/DataContext";

import "./App.css";

import Board from "./components/Board";
import FullColPage from "./pages/FullColPage";
import Header from "./components/Header";
import CardPage from "./pages/CardPage";

const App = () => {
  return (
    <>
      <Header />
      <DataProvider>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/column/:id" element={<FullColPage />} />
          <Route path="/card/:id" element={<CardPage />} /> 
        </Routes>
      </DataProvider>
    </>
  );
};

export default App;
