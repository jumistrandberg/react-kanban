import React, { useEffect, useState, useMemo, useContext } from "react";
import { IoMdTrash } from "react-icons/io";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataContext } from "./DataContext";
import Card from "./Card";

const Column = ({
  column,
  handleDeleteColumn,
  handleCreateCard,
  handleDeleteCard,
  cards,
  updateColumn,

}) => {
  const [editColName, setEditColName] = useState(false);
  const [colTitle, setColTitle] = useState(column.title);
  const cardsIds = useMemo(() => cards.map((card) => card.id), [cards]);

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
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-60 border-2 border-purple-200"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div className="column overflow-auto">
        {/* Column Title  */}
        <div
          {...attributes}
          {...listeners}
          onClick={() => setEditColName(true)}
          className="bg-mainBackgroundColor text-md cursor-grab rounded-md p-3 font-bold border-columnBackgroundColor border-3 flex items-center justify-between"
        >
            <Link to={`/column/${column.id}`}>
            <button className="bg-columnBackgroundColor p-2 rounded-full items-center justify-center">
            <CgArrowsExpandLeft />
          </button>            </Link>
    
          <div className="flex gap-2">
            {!editColName && column.title}
            {editColName && (
              <input
                value={colTitle}
                onChange={handleColInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                onBlur={handleBlur}
                className="bg-mainBackgroundColor focus:border-purple-200 border-2 outline-none px-2 rounded-md cursor-pointer"
              />
            )}
          </div>
          <button
            aria-label="trash icon"
            onClick={() => handleDeleteColumn(column.id)}
            className="hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
          >
            <IoMdTrash />
          </button>
        </div>
        {/* Card container  */}
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden ">
          <SortableContext items={cardsIds}>
            {cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  handleDeleteCard={handleDeleteCard}
                />
              
            ))}
          </SortableContext>
        </div>
      </div>
      <button
        onClick={() => handleCreateCard(column.id)}
        className="hover:bg-mainBackgroundColor hover:border-mainBackgroundColor flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4"
      >
        Add Task
      </button>
      
    </div>
  );
};

export default Column;
