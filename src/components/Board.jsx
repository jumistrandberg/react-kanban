// import React, { useState } from "react";
// import { IoIosAddCircle } from "react-icons/io";
// import Column from "./Column";
// import { DragDropContext } from "react-beautiful-dnd";

// const Board = () => {
//   const [columns, setColumns] = useState([]);
//   console.log(columns);

//   return (
//     <>
//       <DragDropContext>
//         <div className="board">
//           <div className="columns-output-container">
//             {columns.map((col, index) => (
//               <Column
//                 key={index}
//                 column={col}
//                 handleDeleteColumn={handleDeleteColumn}
//               />
//             ))}
//           </div>
//           <button
//             className="new-col-btn"
//             onClick={() => {
//               handleCreateColumn();
//             }}
//             aria-label="Add new column"
//           >
//             <span>New column</span>
//             <IoIosAddCircle />
//           </button>
//         </div>
//       </DragDropContext>
//     </>
//   );

//   function handleCreateColumn() {
//     setColumns((prevColumns) => {
//       // Column to add
//       const columnAdd = {
//         id: prevColumns.length + 1,
//         title: `Column ${prevColumns.length + 1}`,
//       };
//       // Return the updated columns array with the new column
//       return [...prevColumns, columnAdd];
//     });
//   }

//   function handleDeleteColumn(id) {
//     const filteredColumns = columns.filter((col) => col.id !== id);
//     setColumns(filteredColumns);
//   }
// };

// export default Board;
