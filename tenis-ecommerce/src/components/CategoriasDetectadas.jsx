import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoriasDetectadas = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(res => {
        const productos = res.data;
        const categoriasUnicas = {};

        productos.forEach(p => {
          if (!categoriasUnicas[p.categoria]) {
            categoriasUnicas[p.categoria] = p.imagen; // Imagen representativa
          }
        });

        const lista = Object.entries(categoriasUnicas).map(([nombre, imagen]) => ({
          nombre,
          imagen
        }));

        setCategorias(lista);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = (categoria) => {
    navigate(`/?categoria=${encodeURIComponent(categoria)}`);
  };

  return (
    <div className="categorias-container">
      {categorias.map((cat, index) => (
        <div
          key={index}
          className="categoria-card"
          onClick={() => handleClick(cat.nombre)}
        >
          <img src={cat.imagen || 'https://via.placeholder.com/200'} alt={cat.nombre} />
          <p>{cat.nombre.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriasDetectadas;
