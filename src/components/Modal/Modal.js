import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: null,
        border: 0
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const ModalComponent = props => (
    <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        style={customStyles}
        contentLabel={props.contentLabel}
    >
        <div className="modal-wrapper">
            <div className="modal-header">
                <span className="close-modal-btn" onClick={props.onRequestClose}>X</span>
            </div>
            <div className="modal-body">
                <strong>Adicionar usuário</strong>
                <input
                    type="text"
                    value={props.inputValue}
                    onChange={props.handleInputChange}
                    onKeyDown={e => e.keyCode === 13 ? props.handleAddUser() : null }
                />
            </div>
            <div className="modal-footer">
                <button className="btn-cancel" onClick={props.onRequestClose}>Cancelar</button>
                <button className="btn-continue" onClick={props.handleAddUser}>Adicionar</button>
            </div>
        </div>
    </Modal>
);

export default ModalComponent;