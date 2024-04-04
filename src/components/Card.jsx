import React from "react";
import { Draggable } from "react-beautiful-dnd";

// Define Card component with props
const Card = ({ title, index }) => {
  return (
    <Draggable draggableId={title} index={index}>
      {/* Render prop by Draggable  */}
      {(provided) => {
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {title}
        </div>;
      }}
    </Draggable>
  );
};

export default Card;
