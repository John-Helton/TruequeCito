import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProposeExchangePage = () => {
  const [products, setProducts] = useState([]);
  const [productOffered, setProductOffered] = useState('');
  const [productRequested, setProductRequested] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const requestedProduct = products.find(product => product._id === productRequested);
    const userRequested = requestedProduct.user._id;

    try {
      const response = await axios.post(
        '/api/exchanges',
        { productOffered, productRequested, userRequested },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Proponer Intercambio</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Producto Ofrecido:
          <select value={productOffered} onChange={(e) => setProductOffered(e.target.value)} required>
            <option value="">Selecciona un producto</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Producto Solicitado:
          <select value={productRequested} onChange={(e) => setProductRequested(e.target.value)} required>
            <option value="">Selecciona un producto</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Proponer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProposeExchangePage;
