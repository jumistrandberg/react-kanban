import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [cards, setCards] = useState(() => {
    const storedCards = localStorage.getItem("cards");
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const [columns, setColumns] = useState(() => {
    const storedColumns = localStorage.getItem("columns");
    return storedColumns ? JSON.parse(storedColumns) : [];
  });


  const [textareaContents, setTextareaContents] = useState(() => {
    const storedTextareaContents = localStorage.getItem("textareaContents");
    return storedTextareaContents ? JSON.parse(storedTextareaContents) : {};
  });

  useEffect(() => {
    if (columns.length > 0 && cards.length > 0) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          // Filter cards belonging to the current column
          const columnCards = cards.filter(
            (card) => card.columnId === column.id
          );
          // Update the column with the filtered cards
          return { ...column, cards: columnCards };
        })
      );
    }
  }, [cards]); // Removed 'columns' from the dependency array

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns, cards]);

  useEffect(() => {
    if (!localStorage.getItem("cards")) {
      setCards((prevCards) => [...prevCards]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("textareaContents", JSON.stringify(textareaContents));
  }, [textareaContents]);

  useEffect(() => {
    if (!localStorage.getItem("textareaContents")) {
      setTextareaContents((prevTextareaContents) => [...prevTextareaContents]);
    }
  }, []);


  const generateId = () => {
    return Math.floor(Math.random() * 300000);
  };


  return (
    <DataContext.Provider
      value={{ cards, setCards, columns, setColumns, textareaContents, setTextareaContents, generateId }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
