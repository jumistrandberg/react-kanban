import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "./Card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({
  column,
  handleDeleteColumn,
  handleCreateCard,
  handleCardOpen,
  updateColumn,
}) => {
  const [editColName, setEditColName] = useState(false);
  const [colTitle, setColTitle] = useState(column.title);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleColInputChange = (e) => {
    setColTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateColumn(column.id, colTitle);
      setEditColName(false);
    }
  };
  
  const handleBlur = () => {
    updateColumn(column.id, colTitle);
    setEditColName(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="  
      bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        opacity-60
        border-2
        border-purple-200
    "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
    >
      <div className="column">
        {/* Column Title  */}
        <div
          {...attributes}
          {...listeners}
          onClick={() => {
            setEditColName(true);
          }}
          className="
        bg-mainBackgroundColor
        text-md
        cursor-grab
        rounded-md
        p-3
        font-bold
        border-columnBackgroundColor
        border-3
        flex
        items-center
        justify-between"
        >
          <div className="flex gap-2">
            <div
              className="
            bg-columnBackgroundColor 
            flex 
            justify-center 
            items-center 
            px-2 
            py-1 
            rounded-full"
            >
              placeholder
            </div>
            {!editColName && column.title}
            {editColName && (
              <input
                value={colTitle}
                onChange={handleColInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                onBlur={handleBlur}
                className="bg-mainBackgroundColor focus:border-purple-200 border-2 border-rounded outline-none px-2 "
              />
            )}
          </div>
          <button
            aria-label="trash icon"
            onClick={() => {
              handleDeleteColumn(column.id);
              console.log(column.id);
            }}
            className="
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2"
          >
            <IoMdTrash />
          </button>
        </div>
        {/* Card container  */}
        <div className="flex flex-grow">Cards</div>
        {/* <div
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
          </div> */}

        {/* <button onClick={() => handleCreateCard(column.id)}>New task</button> */}
      </div>
    </div>
  );
};

export default Column;
