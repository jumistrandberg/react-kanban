import { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { IoMdTrash } from "react-icons/io";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { CSS } from "@dnd-kit/utilities";
import Modal from "./Modal";
import DataContext from "./DataContext";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const { setCards } = useContext(DataContext);
  const [editCard, setEditCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSaveModal = (id, modalTitle, modalContent) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((c) => {
        if (c.id === id) {
          return { ...c, title: modalTitle, content: modalContent };
        }
        return c;
      });
      return updatedCards;
    });
  };

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
      type: "Card",
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const cardToggleEditMode = () => {
    setEditCard(!editCard);
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
  // In edit mode return
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
        <div className="relative w-full">
          <div className="flex flex-row items-center justify-between">
            <Link to={`/card/${card.id}`}>
              <h2>{card.title}</h2>
            </Link>

            <p className="text-xs">{card.date}</p>
            <button
              onClick={toggleModal}
              className="bg-columnBackgroundColor p-1 rounded-full"
            >
              <CgArrowsExpandLeft className="card-expand-btn" />
            </button>
            {openModal && (
              <Modal
                title={card.title}
                content={card.date}
                id={card.id}
                onClose={toggleModal}
                handleDeleteCard={() => handleDeleteCard(card.id)}
              />
            )}
          </div>
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

  // Outside edit mode return
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
      <div className="w-full">
        <div className="flex flex-row justify-between w-full">
          <Link to={`/Card/${card.id}`}>
            <h3 className="font-bold">{card.title}</h3>
          </Link>

          <button
            onClick={toggleModal}
            className="bg-columnBackgroundColor p-1 rounded-full"
          >
            <CgArrowsExpandLeft className="card-expand-btn" />
          </button>
          {openModal && (
            <Modal
              title={card.title}
              content={card.date}
              id={card.id}
              onClose={toggleModal}
              handleDeleteCard={() => handleDeleteCard(card.id)}
            />
          )}
        </div>
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
