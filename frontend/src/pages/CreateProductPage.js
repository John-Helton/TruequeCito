import React, { useState } from 'react';
import axios from 'axios';

const CreateProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/api/products',
        { title, description, images: images.split(',') },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Publicar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del Producto"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
        ></textarea>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="URLs de Imágenes (separadas por comas)"
        />
        <button type="submit">Publicar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProductPage;
