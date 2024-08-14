import { useRef } from "react";

const DeleteConfirmationPopUp = ({ isOpen, onClose, onDelete }) => {
  const modalRef = useRef(null);

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "#fff",
          //   background: "red",
          padding: "40px",
          borderRadius: "8px",
          maxWidth: "400px",
          textAlign: "center",
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "red" }}>
          Are you sure you want to delete this employee?
        </p>

        <div>
          <button
            onClick={handleDelete}
            style={{
              margin: "10px",
              backgroundColor: "red",
              color: "#fff",
              width: "5rem",
            }}
          >
            Yes
          </button>
          <button
            onClick={onClose}
            style={{ backgroundColor: "blue", color: "#fff", width: "5rem" }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopUp;
