import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const Board = () => {
  // Use States
  const [columns, setColumns] = useState([]);
  console.log(columns);

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
        id: prevColumns[columnId - 1].card.length + 1,
        title: "card", 
        date: new Date().toISOString
      };
      const updatedColumns = prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col, 
            cards: [...col.tasks, newCard]
          };
        }
        return col;
      });
      return updatedColumns;
    });
  };

  return (
    <>
      <DragDropContext>
        <div className="board">
          <div className="columns-output-container">
            {columns.map((col, index) => (
              <Column
                key={index}
                column={col}
                handleDeleteColumn={handleDeleteColumn}
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
      </DragDropContext>
    </>
  );

  

};

export default Board;
