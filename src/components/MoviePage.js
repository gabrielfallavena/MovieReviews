import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const MovieData = () => {
  const { movieName } = useParams();
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fazendo requisições em paralelo
    Promise.all([
      axios.get(`http://localhost:5000/api/Movies/${movieName}/MovieData`),
      axios.get(`http://localhost:5000/api/Movies/${movieName}/Reviews`),
    ])
      .then(([response1, response2]) => {
        setData1(response1.data);
        setData2(response2.data);
      })
      .catch((err) => {
        setError('Erro ao buscar dados das APIs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        <h1>{data1.title}</h1>
        <p>Director: {data1.director}</p>
        <p>Genre: {data1.genre}</p>
        <p>Release date: {data1.releaseDate}</p>
        <p>Synopsis: {data1.synopsis}</p>
        <img src={data1.posterUrl} alt={`${data1.title} Poster`}/>
        {data2.length === 0 ? (
            <p>Nenhuma review encontrada.</p>
        ) : (
            <ul>
            {data2.map(data2 => (
                <li key={data2.id}>
                <h4>{data2.userName}</h4>
                <p>Nota: {data2.rating}</p>
                <p>{data2.comment}</p>
                </li>
            ))}
            </ul>
        )}
        
    </div>
  );
};

export default MovieData;
