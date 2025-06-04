import React from 'react';
import { Card } from 'react-bootstrap';
import { Image } from '../types/image';


interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <Card className="image-card mb-4" onClick={onClick}>
      <Card.Img 
        variant="top" 
        src={`${image.imagePath}`} 
        className="image-thumbnail"
      />
      <Card.Body>
        <Card.Title>{image.name}</Card.Title>
        <Card.Text>R$ {image.value.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;