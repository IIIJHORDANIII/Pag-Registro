import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Image {
  id: string;
  name: string;
  description: string;
  value: number;
  url: string;
  uploadedBy: string;
  imagePath: string;
}

interface User {
  id: string;
  nome: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [newImage, setNewImage] = useState({
    name: '',
    description: '',
    value: '',
    url: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
    fetchUsers();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/images/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setImages(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching images');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching users');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newImage.name);
      formData.append('description', newImage.description);
      formData.append('value', newImage.value);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await axios.post('http://localhost:3000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setNewImage({ name: '', description: '', value: '', url: '' });
      setSelectedFile(null);
      fetchImages();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error creating image');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/images/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchImages();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error deleting image');
    }
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#383A29] mb-8">Painel Administrativo</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-[#383A29] mb-4">Adicionar Nova Imagem</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={newImage.name}
                onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#383A29] focus:ring-[#383A29]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={newImage.description}
                onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#383A29] focus:ring-[#383A29]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor</label>
              <input
                type="number"
                value={newImage.value}
                onChange={(e) => setNewImage({ ...newImage, value: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#383A29] focus:ring-[#383A29]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagem</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full"
                accept="image/*"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#383A29] text-white py-2 px-4 rounded-md hover:bg-[#4a4d35] focus:outline-none focus:ring-2 focus:ring-[#383A29] focus:ring-offset-2"
            >
              Adicionar Imagem
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#383A29]">{image.name}</h3>
                <p className="text-gray-600 mt-2">{image.description}</p>
                <p className="text-[#383A29] font-bold mt-2">R$ {image.value.toFixed(2)}</p>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 