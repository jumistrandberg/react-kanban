import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({
  column,
  handleDeleteColumn,
  handleCreateCard,
  handleCardOpen,
}) => {
  const [editColName, setEditColName] = useState(false);
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
            {column.title}
          </div>
          <button
            aria-label="trash icon"
            onClick={() => {
              handleDeleteColumn(column.id);
              console.log(column.id)
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
