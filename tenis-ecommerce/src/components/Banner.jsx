import React from 'react';

const Banner = ({ onSuscribirse }) => {
  return (
    <div className="banner">
      <h1>EL DEPORTE SE TRATA DE ALEGRÍA</h1>
      <p>
        Nuestra ropa y equipamientos deportivos de primera calidad están diseñados para brindar la máxima comodidad, rendimiento y longevidad. Este año, regala el juego y deja que la alegría reine.
      </p>
      <button onClick={onSuscribirse}>SUSCRÍBETE</button>
    </div>
  );
};

export default Banner;
