import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Image } from '../types/image';

interface ImageModalProps {
  show: boolean;
  image: Image | null;
  onHide: () => void;
  onDelete: (id: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ show, image, onHide, onDelete }) => {
  if (!image) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{image.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img 
              src={`${image.imagePath}`} 
              alt={image.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <p><strong>Descrição:</strong> {image.description || 'Sem descrição'}</p>
            <p><strong>Valor:</strong> R$ {image.value.toFixed(2)}</p>
            <p><strong>Data de Cadastro:</strong> {new Date(image.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(image._id)}>
          Excluir
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;