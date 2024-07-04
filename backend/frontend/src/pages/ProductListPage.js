import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
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
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Productos Disponibles</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div>
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={product.title} width="100" />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
