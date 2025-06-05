import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from '../components/Dashboard';
import { api } from '../services/api';

// Mock do axios
jest.mock('../services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
}));

// Mock do contexto de autenticação, mantendo o AuthProvider real
jest.mock('../contexts/AuthContext', () => {
  const actual = jest.requireActual('../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: {
        _id: '1',
        nome: 'Test User',
        email: 'test@example.com',
        role: 'admin'
      },
      logout: jest.fn()
    })
  };
});

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render dashboard and form fields', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Gerenciar Imagens/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagem/i)).toBeInTheDocument();
  });

  test('should handle image upload', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: {
        _id: '1',
        name: 'Test Image',
        description: 'Test Description',
        value: 100,
        imagePath: 'http://example.com/image.jpg'
      }
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test Image' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/imagem/i), { target: { files: [mockFile] } });

    fireEvent.click(screen.getByText(/enviar imagem/i));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/images', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: expect.any(Function)
      });
    });
  });
}); 