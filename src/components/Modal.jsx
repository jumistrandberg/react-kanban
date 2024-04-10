import React from 'react'

const Modal = ({ card, closeModal }) => {
  return (
    <div>
        <span className='close-modal' onClick={closeModal}>&times;</span>
        <h2>Task</h2>
        <p>Title: {card.title}</p>
        <p>ID: {card.id}</p>
        <p>Date: {card.date}</p>

    </div>
  )
}

export default Modal