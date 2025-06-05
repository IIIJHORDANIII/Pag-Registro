import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Image } from '../types/image';
import './ImageModal.css';

interface ImageModalProps {
  show: boolean;
  onHide: () => void;
  image: Image | null;
  onDelete: () => void;
  isDeleting: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ show, onHide, image, onDelete, isDeleting }) => {
  if (!image) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      className="image-modal"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="image-preview">
          <img src={image.imagePath} alt={image.name} />
        </div>
        <div className="image-details">
          <h4>{image.name}</h4>
          <p className="price">R$ {image.value.toFixed(2)}</p>
          <p className="description">{image.description}</p>
        </div>
        <div className="warning-message">
          <i className="bi bi-exclamation-triangle"></i>
          <p>Tem certeza que deseja excluir esta imagem? Esta ação não pode ser desfeita.</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button 
          variant="secondary" 
          onClick={onHide}
          className="cancel-button"
          disabled={isDeleting}
        >
          Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={onDelete}
          className="delete-button"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Excluindo...
            </>
          ) : (
            'Excluir'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;