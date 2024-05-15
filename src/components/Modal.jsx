import React, { useState } from "react";

const Modal = ({
  title,
  id,
  content,
  onClose,
  cardText,
  handleDeleteCard,
  handleSaveModal,
  textareaContents,
  setTextareaContents,
  handleTextareaChange,
}) => {
  const [modalTitle, setModalTitle] = useState(title);
  const [modalContent, setModalContent] = useState(textareaContents[id] || "");
  const [isEdit, setIsEdit] = useState(false);

  const handleEditTitle = (e) => {
    setModalTitle(e.target.value);
  };

  const handleModalEdit = (e) => {
    setModalContent(e.target.value);
  };

  const handleUpdate = () => {
    handleSaveModal(id, modalTitle, modalContent);
    handleTextareaChange({ id, content: modalContent });
    setTextareaContents({ ...textareaContents, [title]: modalContent });
    setIsEdit(false);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-10" onClick={onClose}>
      <div className="border-2 flex modal-container w-[70%] items-center flex-col" onClick={(e) => e.stopPropagation()}>
        {isEdit ? (
          <>
            <input className="w-full bg-mainBackgroundColor text-mainTextColor" type="text" value={modalTitle} onChange={handleEditTitle} />
            <textarea className="w-full bg-mainBackgroundColor text-mainTextColor" value={modalContent} onChange={handleModalEdit}></textarea>
          </>
        ) : (
          <>
            <div>{title}</div>
            <div>{modalContent}</div>
            <div>{content}</div>
          </>
        )}
        <div className="flex w-full justify-around border-2 bg-mainTextColor bg-opacity-80 text-mainBackgroundColor">
          {!isEdit && (
            <button className="modal-btn hover:bg-mainBackgroundColor hover:text-mainTextColor w-full flex-1" onClick={toggleEdit}>
              Edit
            </button>
          )}
          {!isEdit && (
            <button className="modal-btn hover:bg-mainBackgroundColor hover:text-mainTextColor w-full flex-1" onClick={onClose}>
              Close modal
            </button>
          )}
          {!isEdit && (
            <button className="modal-btn hover:bg-mainBackgroundColor hover:text-mainTextColor w-full flex-1" onClick={handleDeleteCard}>
              Delete Card
            </button>
          )}
          {!isEdit && (
            <button className="modal-btn hover:bg-mainBackgroundColor hover:text-mainTextColor w-full flex-1" onClick={onClose}>
              Cancel
            </button>
          )}
          {isEdit && (
            <button className="modal-btn hover:bg-mainBackgroundColor hover:text-mainTextColor w-full flex-1" onClick={handleUpdate}>
              Save changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
