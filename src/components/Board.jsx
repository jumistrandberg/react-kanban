import { useState, useMemo } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Column from "./Column";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const Board = () => {
  // Use States
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functional components
  const handleCreateColumn = () => {
    setColumns((prevColumns) => {
      const columnAdd = {
        id: prevColumns.length + 1,
        title: `Column ${prevColumns.length + 1}`,
        cards: [],
      };
      return [...prevColumns, columnAdd];
    });
  };

  const handleDeleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  const handleCreateCard = (columnId) => {
    setColumns((prevColumns) => {
      const newCard = {
        id: prevColumns[columnId - 1].cards.length + 1,
        title: "card",
        date: new Date().toISOString,
      };
      const updatedColumns = prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            cards: [...col.cards, newCard],
          };
        }
        return col;
      });
      return updatedColumns;
    });
  };

  const handleCardOpen = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(columns)
  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]"
    >
      <DndContext>
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          <SortableContext items={columnsId}>
          {columns.map((col) => (
            <Column key={col.id} column={col} handleDeleteColumn={handleDeleteColumn}/>
          ))}
          </SortableContext>
        </div>
        <button
          onClick={() => {
            handleCreateColumn();
          }}
          aria-label="Add new column"
          className="
        h-[60px]
        w-[350px]
        min-w-[350px]
        cursor-pointer
        rounded-lg
        bg-mainBackgroundColor
        border-2
        border-columnBackgroundColor
        p-4
        ring-purple-900
        hover:ring-2
        flex
        gap-2
        "
        >
          <IoIosAddCircle />
          Add Column
        </button>
      </div>
      </DndContext>
    </div>
  );
};
//   return (
//     <>
//       <div className="
//       flex
//       m-auto
//       min-h-screen
//       w-full
//       items-center
//       px-[40]
//       overflow-x-auto
//       overflow-y-hidden"
//       >
//         <div className="grid grid-cols-3 gap-4">
//           {columns.map((col, index) => (
//             <Column
//               key={index}
//               column={col}
//               handleDeleteColumn={handleDeleteColumn}
//               handleCreateCard={handleCreateCard}
//               handleCardOpen={handleCardOpen}
//             />
//           ))}
//         </div>
//         <button
//           className="
//             flex items-center justify-center h-12 w-32 border border-gray-300 rounded-lg
//             hover:bg-gray-100 hover:border-gray-400 focus:outline-none
//           "
//           onClick={() => {
//             handleCreateColumn();
//           }}
//           aria-label="Add new column"
//         >
//           <span>New column</span>
//           <IoIosAddCircle className="ml-2" />
//         </button>
//       </div>
//       {isModalOpen && <Modal task={selectedCard} closeModal={closeModal} />}
//     </>
//   );
// };

export default Board;
