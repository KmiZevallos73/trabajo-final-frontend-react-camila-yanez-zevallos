import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ onAddToCart, generoURL = '', categoriaURL = '', mostrar = true }) => {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: '',
    min: '',
    max: '',
    genero: generoURL,
    categoria: categoriaURL
  });

  // Obtener productos desde JSON Server
  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Sincronizar filtros si cambia la URL (desde el Navbar)
  useEffect(() => {
    setFiltros(prev => ({
      ...prev,
      genero: generoURL,
      categoria: categoriaURL
    }));
  }, [generoURL, categoriaURL]);

  // Aplicar filtros locales
  const productosFiltrados = productos.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const matchMin = filtros.min === '' || p.precio >= parseFloat(filtros.min);
    const matchMax = filtros.max === '' || p.precio <= parseFloat(filtros.max);
    const matchGenero =
      filtros.genero === '' ||
      p.genero === filtros.genero ||
      (filtros.genero === 'Hombre' && p.genero === 'Unisex') ||
      (filtros.genero === 'Mujer' && p.genero === 'Unisex');
    const matchCategoria = filtros.categoria === '' || p.categoria === filtros.categoria;
    return matchNombre && matchMin && matchMax && matchGenero && matchCategoria;
  });

  return (
    <div className="product-area">
      {mostrar && <h1 style={{ textAlign: 'center' }}>Catálogo de Tenis</h1>}

      {mostrar && (
        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtros.nombre}
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio mínimo"
            value={filtros.min}
            onChange={(e) => setFiltros({ ...filtros, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={filtros.max}
            onChange={(e) => setFiltros({ ...filtros, max: e.target.value })}
          />
          <select
            value={filtros.genero}
            onChange={(e) => setFiltros({ ...filtros, genero: e.target.value })}
          >
            <option value="">Todos los géneros</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Niños">Niños</option>
            <option value="Unisex">Unisex</option>
          </select>
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
          >
            <option value="">Todas las categorías</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Ropa">Ropa</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>
      )}

      {mostrar && (
        <div className="product-grid">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="card">
              <img src={producto.imagen} alt={producto.nombre} className="product-img" />
              <h3>{producto.nombre}</h3>
              <p>S/. {producto.precio}</p>
              <button onClick={() => onAddToCart(producto)}>Agregar al carrito</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
