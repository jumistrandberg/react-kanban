import { useState, useMemo, useContext } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Column from "./Column";
import Card from "./Card";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { DataContext } from "./DataContext";

const Board = () => {
  const {
    cards,
    setCards,
    columns,
    setColumns,
    textareaContents,
    setTextareaContents,
    generateId,
  } = useContext(DataContext);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [dragColumn, setDragColumn] = useState(null);
  const [dragCard, setDragCard] = useState(null);

  // Functional components
  const handleCreateColumn = () => {
    setColumns((prevColumns) => {
      const columnAdd = {
        id: generateId(),
        title: `Column ${prevColumns.length + 1}`,
        cards: [],
      };
      return [...prevColumns, columnAdd];
    });
  };

  const handleDeleteColumn = (id) => {
    setColumns((prevColumns) => {
      const filteredCols = prevColumns.filter((col) => col.id !== id);
      return filteredCols;
    });
  };

  const updateColumn = (id, title) => {
    const newCols = columns.map((col) =>
      col.id !== id ? col : { ...col, title }
    );

    setColumns(newCols);
  };

  const handleCreateCard = (columnId) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const newCard = {
      id: generateId(),
      columnId,
      title: `Task ${cards.length + 1}`,
      date: formattedDate,
    };

    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleTextareaChange = (cardId, newText) => {
    setTextareaContents((prevTextareaContents) => ({
      ...prevTextareaContents,
      [cardId]: newText,
    }));
  };


  // const handleCardOpen = (card) => {
  //   setSelectedCard(card);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const onDragStart = (e) => {
    if (e.active.data.current.type === "Column") {
      setDragColumn(e.active.data.current.column);
      return;
    }
    if (e.active.data.current.type === "Card") {
      setDragCard(e.active.data.current.card);
      return;
    }
  };

  const onDragEnd = (e) => {
    setDragColumn(null);
    setDragCard(null);
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

  const onDragOver = (e) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isDragCard = active.data.current.type === "Card";
    const isOverCard = over.data.current.type === "Card";

    // Over another card
    if (isDragCard && isOverCard) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((c) => c.id === activeId);
        const overIndex = cards.findIndex((c) => c.id === overId);

        if (cards[activeIndex].columnId !== cards[overIndex].columnId) {
          cards[activeIndex].columnId = cards[overIndex].columnId;
          return arrayMove(cards, activeIndex, overIndex - 1);
        }

        return arrayMove(cards, activeIndex, overIndex);
      });
    }

    // Over a col
    const isOverCol = over.data.current.type === "Column";

    if (isDragCard && isOverCol) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((c) => c.id === activeId);

        cards[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });

        return arrayMove(cards, activeIndex, activeIndex);
      });
    }
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
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <Column
                  key={col.id}
                  column={col}
                  handleDeleteColumn={handleDeleteColumn}
                  updateColumn={updateColumn}
                  handleCreateCard={handleCreateCard}
                  cards={cards.filter((card) => card.columnId === col.id)}
                  handleDeleteCard={handleDeleteCard}
                  // updateCard={updateCard}
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
                updateColumn={updateColumn}
                handleCreateCard={handleCreateCard}
                cards={cards.filter((card) => card.columnId === dragColumn.id)}
                handleDeleteCard={handleDeleteCard}
                // updateCard={updateCard}
              />
            )}
            {dragCard && (
              <Card
                card={dragCard}
                handleDeleteCard={handleDeleteCard}
                textareaContents={textareaContents}
                setTextareaContents={setTextareaContents}
                handleTextareaChange={handleTextareaChange}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Board;
