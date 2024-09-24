// src/pages/AddReviewPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/decodeToken';
import { Link } from 'react-router-dom';

const AddReviewPage = () => {
  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddReview = async (e) => {
    e.preventDefault();

    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você precisa estar logado para adicionar uma review.');
      return;
    }

    const decodedToken = decodeToken(token);
    const username = decodedToken?.unique_name; // Ajuste isso conforme o nome do claim no seu token

    try {
      // Enviar a requisição POST para adicionar a review
      await axios.post('http://localhost:5000/addReview', {
        movieName: movieName,
        rating: rating,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });

      // Navega para uma página de sucesso ou de reviews
      navigate(`/Users/${username}`);
    } catch (err) {
      // Mostrar mensagem de erro
      setError('Falha ao adicionar a review. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Adicionar Review</h1>
      <form onSubmit={handleAddReview}>
        <div>
          <input
            type="text"
            placeholder="Nome do Filme"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Nota (0-10)"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Comentário"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Adicionar Review</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {error && <Link to="/login">Faça login</Link>}
      </form>
    </div>
  );
};

export default AddReviewPage;