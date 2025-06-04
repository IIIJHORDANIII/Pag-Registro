import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ImageFormData } from '../types/image';

interface ImageFormProps {
  onSubmit: (formData: FormData) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ImageFormData>({
    image: null,
    name: '',
    description: '',
    value: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    if (formData.image) data.append('image', formData.image);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('value', formData.value);
    
    onSubmit(data);
    setFormData({
      image: null,
      name: '',
      description: '',
      value: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-5">
      <Form.Group className="mb-3">
        <Form.Label>Imagem</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Valor</Form.Label>
        <Form.Control 
          type="number" 
          step="0.01"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};

export default ImageForm;

