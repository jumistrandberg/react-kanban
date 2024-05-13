import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../components/DataContext";

const CardPage = () => {
  const { id } = useParams();
  const { cards } = useContext(DataContext);

  // Find the task with the matching id
  const card = cards.find((c) => c.id === parseInt(id));

  if (!card) {
    return <div>Card not found!</div>;
  }

  return (
    <main>
      <h2 className="task-title">{card.title}</h2>
      <p className="task-content">{card.date}</p>
    </main>
  );
};

export default CardPage;
