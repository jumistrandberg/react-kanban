import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { IoMdTrash } from "react-icons/io";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ card, handleDeleteCard }) => {
  const [editCard, setEditCard] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const cardToggleEditMode = () => {
    setEditCard((prev) => !prev);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-50
        flex
      flex-col
      text-left
    bg-mainBackgroundColor
      p-2
      h-[100px]
      min-h-[100px]
      items-start
      justify-between
      rounded-md
      border-2
      border-purple-200
      cursor-grab"
      ></div>
    );
  }

  if (editCard) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="
      flex
      flex-col
      text-left
      bg-mainBackgroundColor
      p-2
      h-[100px]
      min-h-[100px]
      items-start
      justify-between
      rounded-md
      hover:ring-2
      hover:ring-inset
      hover:ring-purple-200
      cursor-grab
      "
      >
        <div className="flex flex-row items-center gap-6">
          <h3 className="font-bold">{card.title}</h3>
          <p className="text-xs">{card.date}</p>
        </div>
        <div className="flex w-[100%]">
          <textarea
            className="
          h-[100%]
          w-[100%]
          resize-none 
          border-none
          bg-transparent 
          text-mainTextColor 
          focus:outline-none"
          ></textarea>
          <button
            onClick={() => {
              handleDeleteCard(card.id);
            }}
            aria-label="trash icon"
            className="pr-0 self-end hover:text-red-700 border-none"
          >
            <IoMdTrash />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={cardToggleEditMode}
      className="
        flex
        flex-col
        text-left
        bg-mainBackgroundColor
        p-2
        h-[100px]
        min-h-[100px]
        items-start
        justify-between
        rounded-md
        hover:ring-2
        hover:ring-inset
        hover:ring-purple-200
        cursor-grab
        "
    >
      <div className="flex flex-row">
        <h3 className="font-bold">{card.title}</h3>
      </div>
      <div>
        <p>{card.date}</p>
      </div>
      <button
        onClick={() => {
          handleDeleteCard(card.id);
        }}
        aria-label="trash icon"
        className="self-end hover:text-red-700"
      >
        <IoMdTrash />
      </button>
    </div>
  );
};

export default Card;
