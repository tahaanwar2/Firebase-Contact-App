import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-close">
              <button onClick={onClose} className="close-button">
                Close
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
