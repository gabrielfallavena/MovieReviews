import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const UserData = () => {
  const { userName } = useParams();
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const navigate = useNavigate();

  // Função para decodificar o token e obter o nome do usuário logado
  const getLoggedInUserName = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.unique_name; // Supondo que o nome do usuário esteja no campo unique_name do token
    }
    return null;
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  useEffect(() => {
    // Fazendo requisições em paralelo
    Promise.all([
      axios.get(`http://localhost:5000/api/Users/${userName}/UserData`),
      axios.get(`http://localhost:5000/api/Users/${userName}/UserReviews`),
      axios.get(`http://localhost:5000/api/Users/${userName}/Friends`)
    ])
      .then(([response1, response2, response3]) => {
        setData1(response1.data);
        setData2(response2.data);
        setData3(response3.data);
      })
      .catch((err) => {
        setError('Erro ao buscar dados das APIs');
      })
      .finally(() => {
        setLoading(false);
      });
      const loggedInUserName = getLoggedInUserName();
      if (loggedInUserName && loggedInUserName === userName) {
        setIsCurrentUser(true);
      }
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Perfil de {data1.name}</h1>
      <p>Email: {data1.email}</p>
      <p>Nickname: {data1.nickname}</p>
      <h2>Reviews de {data1.name}</h2>
      {data2.length === 0 ? (
        <p>Nenhuma review encontrada.</p>
      ) : (
        <ul>
          {data2.map(review => (
            <li key={review.id}>
              <h4>{review.movieTitle}</h4>
              <p>Nota: {review.rating}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Amigos de {data1.name}</h2>
      {data3.length === 0 ? (
        <p>Usuário não possui amigos</p>
      ) : (
        <ul>
          {data3.map(friend => (
            <li key={friend.id}>
              <p>Nome: {friend.name}</p>
            </li>
          ))}
        </ul>
      )}
      {isCurrentUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default UserData;
