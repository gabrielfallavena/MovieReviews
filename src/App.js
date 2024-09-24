import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AddReview from './components/AddReview';
import Logout from './components/Logout';
import Layout from './components/Layout';
import UserProfile from './components/UserProfile';
import CreateUser from './components/CreateUser';
import MoviePage from './components/MoviePage'
import './styles/Global.css'; // Importa o CSS global

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Users/:userName" element={<Layout><UserProfile/></Layout>} />
        <Route path="/Movies/:movieName" element={<Layout><MoviePage/></Layout>} />
        <Route path="" element={<Layout><HomePage/></Layout>} />
        <Route path="/login" element={<Layout><LoginPage/></Layout>} />
        <Route path="/create-user" element={<Layout><CreateUser/></Layout>} />
        <Route path="/add-review" element={<Layout><AddReview/></Layout>} />
        <Route path="/logout" element={<Layout><Logout/></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;