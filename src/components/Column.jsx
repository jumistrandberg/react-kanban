import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { Droppable } from "react-beautiful-dnd";
import { useSearchParams } from "react-router-dom";

const Column = ({ column, handleDeleteColumn }) => {
  const [editColName, setEditColName] = useState(false);

  return (
    <>
      <div className="column">
        <div
          className="col-top-part"
          onClick={() => {
            setEditColName(true);
          }}
        >
          <div>
            {!editColName && column.title}{" "}
            {editColName && (
              <input
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onBlur={() => {
                  setEditColName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditColName(false);
                }}
              />
            )}
          </div>

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
              isDraggingOver={snapshot.isDraggingOver}
            >
              Content
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button onClick={() => handleCreateCard(column.id)}>New task</button>
      </div>
    </>
  );
};

export default Column;
