import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";

const Column = ({ column, handleDeleteColumn, handleCreateCard, handleCardOpen }) => {
  const [editColName, setEditColName] = useState(false);

  return (
    <div className="
    bg-mainBackgroundColor
    w-[400px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    ">
      <div className="column">
        <div
          className="col-top-part"
          onClick={() => {
            setEditColName(true);
          }}
        >
          {/* <div>
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
          </div> */}

          <button
            aria-label="trash icon"
            onClick={() => {
              handleDeleteColumn(column.id);
            }}
          >
            <IoMdTrash />
          </button>
        </div>
      
        <button onClick={() => handleCreateCard(column.id)}>New task</button>
      </div>
    </div>
  );
};

export default Column;
