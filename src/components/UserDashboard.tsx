import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Image {
  id: string;
  name: string;
  description: string;
  value: number;
  url: string;
  imagePath: string;
}

const UserDashboard: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignedImages();
  }, []);

  const fetchAssignedImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/images/assigned', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setImages(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching assigned images');
    }
  };

  return (
    <div className="min-h-screen bg-[#d9d9d9] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#383A29] mb-8">Suas Imagens</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 