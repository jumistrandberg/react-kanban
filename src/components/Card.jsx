import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, handleCardOpen }) => {
  return (
    <div onClick={() => handleCardOpen(card)}>
      <div>
        <h3>{card.title}</h3>
      </div>
      <div>
        <p>{card.id}</p>
        <p>{card.date}</p>
      </div>
    </div>
  );
};

export default Card;
