import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const goToUserPage = () => {
    // Aqui, você pode decodificar o token para obter o nome do usuário
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userName = decodedToken.unique_name; // Supondo que o token tenha o nome no campo 'unique_name'
    navigate(`/users/${userName}`);
  };

  // Função para buscar usuários e filmes conforme o input
  const handleSearch = async (query) => {
    if (query.length > 0) {
      try {
        // Busca por usuários
        const userResponse = await axios.get(`http://localhost:5000/api/Users/searchUser?query=${query}`);
        setUsers(userResponse.data);

        // Busca por filmes
        const movieResponse = await axios.get(`http://localhost:5000/api/Movies/searchMovies?query=${query}`);
        setMovies(movieResponse.data);

        setDropdownVisible(true);
      } catch (error) {
        console.error("Erro ao buscar usuários e filmes:", error);
      }
    } else {
      setDropdownVisible(false);
    }
  };

  // Função chamada quando o usuário digita no input
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-content">Home</Link>
        <Link to="/add-review" className="nav-content">Add Review</Link>
      </div>
      <div className="navbar-center"> 
        <input
            type="text"
            placeholder="Search for users or movies"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
        />
        {/* Dropdown de sugestões */}
        {isDropdownVisible && (users.length > 0 || movies.length > 0) && (
            <div className="dropdown">
              {users.length > 0 && (
                <div>
                  <h4>Users</h4>
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>
                        <a href={`/Users/${user.name}`}>{user.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {movies.length > 0 && (
                <div>
                  <h4>Movies</h4>
                  <ul>
                    {movies.map((movie) => (
                      <li key={movie.movieId}>
                        <a href={`/Movies/${movie.title}`}>{movie.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
        )}
      </div>
      <div className="navbar-right">
        {!token && (
          <Link to="/login" className="nav-content">Login</Link>
        )} 
        {token && (
          <button onClick={goToUserPage} className="nav-content">My Profile</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;