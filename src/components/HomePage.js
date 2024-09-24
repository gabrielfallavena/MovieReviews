import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo ao MovieReviews!</h1>
      <p>Faça login para adicionar suas reviews e fazer amizade com outros cinéfilos.</p>
      <Link to="/login" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}>
        Ir para a página de login
      </Link>
    </div>
  );
};

export default HomePage;