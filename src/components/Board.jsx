import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";
import Modal from "./Modal";

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
        cards: []
      };
      return [...prevColumns, columnAdd];
    });
  };

  const handleDeleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  const handleCreateCard = (columnId) => {
    setColumns((prevColumns) => {
      const newCard = {
        id: prevColumns[columnId - 1].cards.length + 1,
        title: "card", 
        date: new Date().toISOString
      };
      const updatedColumns = prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col, 
            cards: [...col.cards, newCard]
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
  }

  const closeModal = () => {
    setIsModalOpen(false); 
  }

  return (
    <>
        <div className="board">
          <div className="columns-output-container">
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
            className="new-col-btn"
            onClick={() => {
              handleCreateColumn();
            }}
            aria-label="Add new column"
          >
            <span>New column</span>
            <IoIosAddCircle />
          </button>
        </div>
        {isModalOpen && <Modal task={selectedCard} closeModal={closeModal} />} 
    </>
  );

  

};

export default Board;
