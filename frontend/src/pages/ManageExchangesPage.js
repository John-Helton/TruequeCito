import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExchanges = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/exchanges', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExchanges(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  const handleStatusChange = async (exchangeId, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        '/api/exchanges/status',
        { exchangeId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExchanges(exchanges.map(exchange =>
        exchange._id === exchangeId ? { ...exchange, status } : exchange
      ));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (loading) return <p>Cargando intercambios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Gestionar Intercambios</h1>
      <ul>
        {exchanges.map((exchange) => (
          <li key={exchange._id}>
            <p>Producto Ofrecido: {exchange.productOffered.title}</p>
            <p>Producto Solicitado: {exchange.productRequested.title}</p>
            <p>Status: {exchange.status}</p>
            {exchange.status === 'pending' && (
              <div>
                <button onClick={() => handleStatusChange(exchange._id, 'accepted')}>Aceptar</button>
                <button onClick={() => handleStatusChange(exchange._id, 'rejected')}>Rechazar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageExchangesPage;
