import React from 'react';

const Modal = ({ isOpen, onClose, onContinue, word, setWord }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Edit Word</h2>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="modal-input"
                />
                <div className="modal-buttons">
                    <button onClick={onContinue} className="continue-btn">Continue</button>
                    <button onClick={onClose} className="close-btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
