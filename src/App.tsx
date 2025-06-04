import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';
import ImageModal from './components/ImageModal';
import { getImages, uploadImage, deleteImage } from './services/api';
import { Image } from './types/image';
import '../src/css/App.css';

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getImages();
      setImages(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar imagens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (formData: FormData) => {
    try {
      setLoading(true);
      await uploadImage(formData);
      await fetchImages();
      setError(null);
    } catch (err) {
      setError('Erro ao enviar imagem');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteImage(id);
      setShowModal(false);
      await fetchImages();
      setError(null);
    } catch (err) {
      setError('Erro ao excluir imagem');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Gerenciador de Imagens</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <ImageForm onSubmit={handleUpload} />
      
      <ImageList 
        images={images} 
        loading={loading}
        onImageClick={handleImageClick}
      />
      
      <ImageModal 
        show={showModal}
        image={selectedImage}
        onHide={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default App;