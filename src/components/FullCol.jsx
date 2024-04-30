import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FullCol = ({ columns }) => {
  const { id } = useParams(); // Get column id from URL
  const [column, setColumn] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Find the column with the specified ID
    const foundColumn = columns.find(col => col.id === parseInt(id));
    if (foundColumn) {
      setColumn(foundColumn); // Set the found column
      setCards(foundColumn.cards); // Set the cards associated with the column
    }
  }, [columns, id]);

  return (
    <div>
      <h2>Full Column View</h2>
      {column && (
        <div>
          <h3>{column.title}</h3>
          {/* Display any other column details as needed */}
        </div>
      )}
      <h3>Cards</h3>
      {cards.map(card => (
        <div key={card.id}>
          <p>Title: {card.title}</p>
          {/* Display other card details */}
        </div>
      ))}
    </div>
  );
};

export default FullCol;
