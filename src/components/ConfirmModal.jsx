import "../styles/ConfirmModal.css";

function ConfirmModal({ isOpen, onClose, onConfirm }) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>Delete Product</h2>

                <p>
                    Are you sure you want to delete this product?
                </p>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;