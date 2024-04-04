import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'

const Column = ({ title, cards }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column