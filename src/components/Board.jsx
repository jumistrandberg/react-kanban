import { useState, useMemo } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Column from "./Column";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const Board = () => {
  // Use States
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragColumn, setDragColumn] = useState(null);

  // Functional components
  const handleCreateColumn = () => {
    setColumns((prevColumns) => {
      const columnAdd = {
        id: generateColId(),
        title: `Column ${prevColumns.length + 1}`,
        cards: [],
      };
      return [...prevColumns, columnAdd];
    });
  };

  const generateColId = () => {
    return Math.floor(Math.random() * 3000);
  };

  const handleDeleteColumn = (id) => {
    setColumns((prevColumns) => {
      const filteredCols = prevColumns.filter((col) => col.id !== id);
      return filteredCols;
    });
  };

  const updateColumn = (id, title) => {
    const newCols = columns.map(col =>
      col.id !== id ? col : { ...col, title }
    );
    
    setColumns(newCols);
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

  const onDragStart = (e) => {
    if (e.active.data.current.type === "Column") {
      setDragColumn(e.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return;

    const dragColId = active.id;
    const overColId = over.id;

    if (dragColId === overColId) return;

    setColumns((columns) => {
      const activeColIndex = columns.findIndex((col) => col.id === dragColId);

      const overColIndex = columns.findIndex((col) => col.id === overColId);

      // Swapp
      return arrayMove(columns, activeColIndex, overColIndex);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <Column
                  key={col.id}
                  column={col}
                  handleDeleteColumn={handleDeleteColumn}
                  updateColumn={updateColumn}
                />
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

        {createPortal(
          <DragOverlay>
            {dragColumn && (
              <Column
                column={dragColumn}
                handleDeleteColumn={handleDeleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
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
