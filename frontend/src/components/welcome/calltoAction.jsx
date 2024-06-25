import React from 'react';
import './CallToAction.css';
//import mainImage from './main-image.jpg'; // Asegúrate de tener esta imagen en tu proyecto

const CallToAction = () => {
    return (
        <div className="cta-container">
          <div className="cta-text">
            <button className="cta-tag">¡Explora el mundo del trueque!</button>
            <h1>Intercambia <span>los mejores productos</span> del mundo</h1>
            <p>Hacemos felices a nuestros usuarios ofreciéndoles tantas opciones como sea posible para intercambiar.</p>
            <div className="cta-buttons">
              <button className="cta-button primary">Comenzar Trueque</button>
            </div>
          </div>
          <div className="cta-images">
            <div className="cta-image-container">
              <img src="https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06512688.png" alt="Producto 1" className="cta-image" />
              <div className="cta-image-tag">Top Productos</div>
            </div>
          </div>
        </div>
      );
    };

export default CallToAction;
