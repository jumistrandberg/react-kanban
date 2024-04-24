import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

import Column from "./Column";

const Board = () => {
  // Use States
  const [columns, setColumns] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functional components
  const handleCreateColumn = () => {
    setColumns((prevColumns) => {
      const columnAdd = {
        id: prevColumns.length + 1,
        title: `Column ${prevColumns.length + 1}`,
        cards: [],
      };
      return [...prevColumns, columnAdd];
    });
  };

  const handleDeleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  const handleCreateCard = (columnId) => {
    setColumns((prevColumns) => {
      const newCard = {
        id: prevColumns[columnId - 1].cards.length + 1,
        title: "card",
        date: new Date().toISOString,
      };
      const updatedColumns = prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            cards: [...col.cards, newCard],
          };
        }
        return col;
      });
      return updatedColumns;
    });
  };

  const handleCardOpen = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="bg-mainBackgroundColor text-mainTextColor">Tailwind?</div>
      <div className="flex m-auto min-h-screen w-full items-center px-10">
        <div className="grid grid-cols-3 gap-4">
          {columns.map((col, index) => (
            <Column
              key={index}
              column={col}
              handleDeleteColumn={handleDeleteColumn}
              handleCreateCard={handleCreateCard}
              handleCardOpen={handleCardOpen}
            />
          ))}
        </div>
        <button
          className="
            flex items-center justify-center h-12 w-32 border border-gray-300 rounded-lg
            hover:bg-gray-100 hover:border-gray-400 focus:outline-none
          "
          onClick={() => {
            handleCreateColumn();
          }}
          aria-label="Add new column"
        >
          <span>New column</span>
          <IoIosAddCircle className="ml-2" />
        </button>
      </div>
      {isModalOpen && <Modal task={selectedCard} closeModal={closeModal} />}
    </>
  );
};

export default Board;
