import React from "react";
import { IoMdTrash } from "react-icons/io";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, handleDeleteColumn }) => {
  return (
    <>
      <div className="column">
        <div className="col-top-part">
          <div>{column.title}</div>
          <button
            aria-label="trash icon"
            onClick={() => {
              handleDeleteColumn(column.id);
            }}
          >
            <IoMdTrash />
          </button>
        </div>
        <Droppable droppableId={column.id.toString()}>
        {(provided, snapshot) => (
          <div
            className="content-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            Content
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
    </>
  );
};

export default Column;
