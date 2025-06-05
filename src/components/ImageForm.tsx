import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ImageFormData } from '../types/image';
import './ImageForm.css';

interface ImageFormProps {
  onSubmit: (formData: ImageFormData) => Promise<void>;
}

const ImageForm: React.FC<ImageFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ImageFormData>({
    name: '',
    description: '',
    value: '',
    image: null
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        value: '',
        image: null
      });
      setPreviewUrl(null);
      if (document.getElementById('image')) {
        (document.getElementById('image') as HTMLInputElement).value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar imagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-4">
        <Form.Label>Imagem</Form.Label>
        <div className="image-upload-container">
          <Form.Control
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="image-upload-input"
          />
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Digite o nome do produto"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Digite a descrição do produto"
          className="fixed-textarea"
          style={{ height: '100px', resize: 'none' }}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Valor</Form.Label>
        <Form.Control
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
          placeholder="Digite o valor do produto"
        />
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        disabled={loading}
        className="w-100"
      >
        {loading ? 'Cadastrando...' : 'Cadastrar Imagem'}
      </Button>
    </Form>
  );
};

export default ImageForm;

