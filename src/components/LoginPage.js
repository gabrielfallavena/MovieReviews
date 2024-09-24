// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Enviar a requisição de login para a API
      const response = await axios.post('http://localhost:5000/api/Auth/login', {
        email,
        password
      });
      
      // Armazenar o token retornado
      localStorage.setItem('token', response.data.token);
      
      // Redirecionar ou mostrar uma mensagem de sucesso
      navigate(`/Users/${email}`);
    } catch (err) {
      // Mostrar mensagem de erro
      setError('Falha no login. Verifique seu email e senha.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Página de Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div>
        <h3>Não possui conta ?</h3>
        <Link to="/create-user" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}> 
          Crie sua conta
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
