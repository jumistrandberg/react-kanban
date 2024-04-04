import React from "react";
import { IoMdTrash } from "react-icons/io";


const Column = ({ column, handleDeleteColumn }) => {
  return (
    <>
      <div className="col-top-part">
        <div>{column.title}</div>
        <button
          aria-label="trash icon"
          onClick={() => {
            handleDeleteColumn(column.id);
          }}
        >
          <IoMdTrash />
        </button>
      </div>

      <div className="content-container">Content</div>
    </>
  );
};

export default Column;
