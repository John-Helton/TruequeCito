import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/products?search=${searchTerm}`);
      setProducts(response.data);
      history.push('/');
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          True<span className="sub-brand">quecito</span>
        </Link>
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          {isAuthenticated && (
            <Link to="/create-product">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          )}
          <FontAwesomeIcon icon={faBell} />
          <div className="navbar-user">
            <FontAwesomeIcon icon={faUser} />
            {isAuthenticated && user ? (
              <span className="navbar-user-name">{user.name}</span>
            ) : (
              <Link to="/login" className="navbar-user-name">Perfil</Link>
            )}
            <div className="dropdown-content">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">Perfil</Link>
                  <button onClick={logout}>Cerrar Sesión</button>
                </>
              ) : (
                <>
                  <Link to="/login">Iniciar Sesión</Link>
                  <Link to="/register">Registrarse</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
