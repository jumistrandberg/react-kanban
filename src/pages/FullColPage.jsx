import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import Card from "../components/Card";

const FullColPage = () => {
  const { id } = useParams();
  const { cards } = useContext(DataContext);

  const filteredCards = cards.filter((card) => card.column.id === id);

  return (
    <div>
      {id && (
        <>
          {filteredCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </>
      )}
    </div>
  );
};

export default FullColPage;
