import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  title,
  content,
  onClose,
  handleDeleteCard,
  handleSaveModal
}) => {
  const [modalTitle, setModalTitle] = useState(title);
  const [modalContent, setModalContent] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  

  const handleEditTitle = (e) => {
    setModalTitle(e.target.value);
  };

  const handleModalEdit = (e) => {
    setModalContent(e.target.value);
  };

  const handleUpdate = () => {
    handleSaveModal(title, modalTitle, modalContent);
    setIsEdit(false);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div
      className="
    fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div className="border-2 flex modal-container" onClick={(e) => e.stopPropagation()}>
        {isEdit ? (
          <>
            <input type="text" value={modalTitle} onChange={handleEditTitle} />
            <textarea
              value={modalContent}
              onChange={handleModalEdit}
            ></textarea>
          </>
        ) : (
          <>
            <div>{title}</div>
            <div>{content}</div>
          </>
        )}
        <button className="modal-btn" onClick={toggleEdit}>
          {isEdit ? "Discard" : "Edit"}
        </button>
        {!isEdit && (
          <button className="modal-btn" onClick={onClose}>
            Close modal
          </button>
        )}
        {!isEdit && (
          <button className="modal-btn" onClick={handleDeleteCard}>
            Delete Card
          </button>
        )}
        {!isEdit && (
          <button className="modal-btn" onClick={onClose}>
            Cancel
          </button>
        )}
        {isEdit && (
          <button className="modal-btn" onClick={handleUpdate}>
            Save changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
