import React, { useState } from 'react';
import axios from 'axios';

const CreatePaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/api/payments',
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Realizar Pago</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          required
        />
        <button type="submit">Pagar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePaymentPage;
