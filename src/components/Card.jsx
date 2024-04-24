import { IoMdTrash } from "react-icons/io";

const Card = ({ card, handleCardOpen }) => {
  return (
    <div
      onClick={() => handleCardOpen(card)}
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
        <p>{card.id}</p>
        <p>{card.date}</p>
      </div>
      <button aria-label="trash icon" className="self-end hover:text-red-700">
          <IoMdTrash />
        </button>
    </div>
  );
};

export default Card;
