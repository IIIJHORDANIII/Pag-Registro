import React from 'react';
import { Card } from 'react-bootstrap';
import { Image } from '../types/image';
import './ImageCard.css';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
  isAdmin: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, isAdmin }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="image-card mb-4" onClick={onClick}>
      <Card.Img
        variant="top"
        src={image.imagePath}
        alt={image.name}
        className="image-thumbnail"
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">{image.name}</Card.Title>
          <Card.Text className="price mb-0">R$ {image.value.toFixed(2)}</Card.Text>
        </div>
        <div className="image-info mt-2">
          <Card.Text className="date mb-1">
            {formatDate(image.createdAt)}
          </Card.Text>
          {image.uploadedBy && (
            <Card.Text className="uploader">
              {image.uploadedBy.nome}
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;