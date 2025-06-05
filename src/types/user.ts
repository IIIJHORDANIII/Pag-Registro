export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  nascimento: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData extends LoginCredentials {
  nome: string;
  cpf: string;
  nascimento: string;
} 