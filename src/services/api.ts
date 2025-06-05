import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Adiciona o token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('@LisModas:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Log de requisições
api.interceptors.request.use(request => {
  console.log('Iniciando requisição:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
});

// Log de respostas
api.interceptors.response.use(
  response => {
    console.log('Resposta recebida:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('Erro na requisição:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: async (email: string, senha: string) => {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  }
};

// Image endpoints
export const imageApi = {
  getImages: async () => {
    const response = await api.get('/api/images');
    return response.data;
  },
  uploadImage: async (formData: FormData) => {
    const response = await api.post('/api/images', formData);
    return response.data;
  },
  deleteImage: async (id: string) => {
    const response = await api.delete(`/api/images/${id}`);
    return response.data;
  }
};

export { api };