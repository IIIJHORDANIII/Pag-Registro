import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import ImageCard from './ImageCard';
import { Image } from '../types/image';
import './ImageList.css';

interface ImageListProps {
  images: Image[];
  loading: boolean;
  error: string | null;
  onImageClick: (image: Image) => void;
  isAdmin: boolean;
}

const ImageList: React.FC<ImageListProps> = ({ images, loading, error, onImageClick, isAdmin }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        {error}
      </Alert>
    );
  }

  if (images.length === 0) {
    return (
      <Alert variant="info" className="my-4">
        Nenhuma imagem cadastrada.
      </Alert>
    );
  }

  return (
    <Row className="justify-content-center">
      {images.map((image) => (
        <Col key={image._id} xs={12} sm={6} md={4} className="mb-4">
          <ImageCard
            image={image}
            onClick={() => onImageClick(image)}
            isAdmin={isAdmin}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ImageList;