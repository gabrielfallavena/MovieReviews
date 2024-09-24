// src/pages/AddReviewPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      // Enviar a requisição POST para adicionar a review
      await axios.post('http://localhost:5000/createUser', {
        Name: userName,
        Email: email,
        Nickname: nickname,
        Password: password
      })
      // Navega para uma página de sucesso ou de reviews
      navigate(`/Users/${userName}`);
    } catch (err) {
      // Mostrar mensagem de erro
      setError('Falha ao criar o usuario.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Criar conta</h1>
      <form onSubmit={handleCreateUser}>
        <div>
          <input
            type="text"
            placeholder="Nome completo"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Criar conta</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateUser;