import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallToAction from '../components/welcome/calltoAction';

const HomePage = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <CallToAction />
      <h1>Productos Disponibles</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '200px' }}>
            <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button onClick={() => window.location.href = `/propose-exchange?productRequested=${product._id}`}>Proponer Intercambio</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
