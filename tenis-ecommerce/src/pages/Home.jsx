import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Banner from '../components/Banner';
import BannerLuxilon from '../components/BannerLuxilon';
import CategoriasDetectadas from '../components/CategoriasDetectadas';
import FormularioSuscripcion from '../components/FormularioSuscripcion';
import { useLocation } from 'react-router-dom';

const Home = ({ onAddToCart }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const genero = query.get('genero') || '';
  const categoria = query.get('categoria') || '';

  const hayFiltro = genero !== '' || categoria !== '';
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div>
      <Banner onSuscribirse={() => setMostrarFormulario(true)} />
      {mostrarFormulario && <FormularioSuscripcion />}
      {!hayFiltro && <BannerLuxilon />}
      {!hayFiltro && <CategoriasDetectadas />}
      <ProductList
        onAddToCart={onAddToCart}
        generoURL={genero}
        categoriaURL={categoria}
        mostrar={hayFiltro}
      />
    </div>
  );
};

export default Home;
