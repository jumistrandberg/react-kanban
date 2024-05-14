import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "../components/DataContext";
import Card from "../components/Card";

const FullColPage = () => {
  const { columns, cards } = useContext(DataContext);
  const { id } = useParams(); 

  const column = columns.find((c) => c.id === parseInt(id)); 

  if (!column) {
    return <div>Column not found!</div>
  }

  const filteredCards = column.cards;


  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-mainBackgroundColor hover:underline mb-4">
        Back to Board
      </Link>
      {/* Column Title */}
      <h2 className="text-2xl font-bold mb-4 text-mainBackgroundColor">{column.title}</h2> 
      {/* Card container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FullColPage;
