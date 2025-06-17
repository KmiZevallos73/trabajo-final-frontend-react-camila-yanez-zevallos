import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BannerLuxilon = () => {
  const navigate = useNavigate();
  const [imagenRandom, setImagenRandom] = useState('');

  const handleClick = () => {
    navigate('/?categoria=Accesorios');
  };

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(res => {
        const accesorios = res.data.filter(p => p.categoria === 'Accesorios');
        if (accesorios.length > 0) {
          const productoAleatorio = accesorios[Math.floor(Math.random() * accesorios.length)];
          setImagenRandom(productoAleatorio.imagen);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="luxilon-banner">
      <div className="luxilon-text">
        <p>CALIDAD Y RENDIMIENTO EN CADA GOLPE</p>
        <h2>LUXILON</h2>
        <button onClick={handleClick}>COMPRAR</button>
      </div>
      <div className="luxilon-image-dynamic">
        {imagenRandom && <img src={imagenRandom} alt="Accesorio destacado" />}
      </div>
    </div>
  );
};

export default BannerLuxilon;

