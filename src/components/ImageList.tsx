import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import ImageCard from './ImageCard';
import { Image } from '../types/image';

interface ImageListProps {
  images: Image[];
  loading: boolean;
  onImageClick: (image: Image) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, loading, onImageClick }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  if (images.length === 0) {
    return <p className="text-center my-5">Nenhuma imagem cadastrada</p>;
  }

  return (
    <Row>
      {images.map(image => (
        <Col key={image._id} md={4} className="mb-4">
          <ImageCard 
            image={image} 
            onClick={() => onImageClick(image)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ImageList;