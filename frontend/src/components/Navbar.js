import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, logout } = useContext(AuthContext);
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
      <div className="navbar-top">
        <div className="navbar-brand">Truequecito</div>
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="navbar-user">
          <FontAwesomeIcon icon={faUser} />
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
      <div className="navbar-divider"></div>
      <div className="navbar-bottom">
        <Link to="/" className="navbar-link">
          <FontAwesomeIcon icon={faHome} /> Inicio
        </Link>
        {isAuthenticated && (
          <Link to="/create-product" className="navbar-link">
            <FontAwesomeIcon icon={faPlus} /> Publicar Producto
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
