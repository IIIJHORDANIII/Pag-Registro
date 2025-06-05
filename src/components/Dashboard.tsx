import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Image, ImageFormData } from '../types/image';
import { imageApi } from '../services/api';
import ImageForm from './ImageForm';
import ImageList from './ImageList';
import ImageModal from './ImageModal';
import Header from './Header';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      console.log('Iniciando busca de imagens...');
      const data = await imageApi.getImages();
      console.log('Dados recebidos:', data);
      setImages(data);
      setError(null);
    } catch (err: any) {
      console.error('Erro detalhado ao carregar imagens:', err);
      const errorMessage = err.response?.data?.error || 'Erro ao carregar imagens. Por favor, tente novamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (formData: ImageFormData) => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('value', formData.value);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await imageApi.uploadImage(data);
      await fetchImages();
    } catch (err: any) {
      console.error('Erro ao fazer upload da imagem:', err);
      throw new Error(err.response?.data?.error || 'Erro ao fazer upload da imagem');
    }
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleDeleteImage = async () => {
    if (!selectedImage) return;

    try {
      setIsDeleting(true);
      await imageApi.deleteImage(selectedImage._id);
      setImages(images.filter(img => img._id !== selectedImage._id));
      handleCloseModal();
    } catch (err: any) {
      console.error('Erro ao deletar imagem:', err);
      const errorMessage = err.response?.data?.error || 'Erro ao deletar imagem. Por favor, tente novamente.';
      setError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-wrapper">
      <Header adminName={user.nome} onLogout={handleLogout} />
      <Container className="dashboard-container">
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        
        <div className="form-section">
          <ImageForm onSubmit={handleImageUpload} />
        </div>

        <div className="images-section">
          <ImageList
            images={images}
            loading={loading}
            error={error}
            onImageClick={handleImageClick}
            isAdmin={user.role === 'admin'}
          />
        </div>

        <ImageModal
          show={showModal}
          onHide={handleCloseModal}
          image={selectedImage}
          onDelete={handleDeleteImage}
          isDeleting={isDeleting}
        />
      </Container>
    </div>
  );
};

export default Dashboard; 