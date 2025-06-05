import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Registro.css';

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    nascimento: '',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  });
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedCPF = formatCPF(value);
    setFormData(prev => ({
      ...prev,
      cpf: formattedCPF
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.senha !== formData.confirmacaoSenha) {
        throw new Error('As senhas não coincidem!');
      }

      const { confirmacaoSenha, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (err: any) {
      // Error is already handled by the AuthContext
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit} className="registro-form">
        <h2>Cadastro</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleCPFChange}
            required
            disabled={loading}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nascimento">Data de Nascimento</label>
          <input
            type="date"
            id="nascimento"
            name="nascimento"
            value={formData.nascimento}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Digite seu email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Digite sua senha"
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmacaoSenha">Confirmação de Senha</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={formData.confirmacaoSenha}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Confirme sua senha"
            minLength={6}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <div className="login-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </div>
      </form>
    </div>
  );
};

export default Registro; 