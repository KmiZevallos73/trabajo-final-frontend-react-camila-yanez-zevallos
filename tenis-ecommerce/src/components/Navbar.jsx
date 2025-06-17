import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/cartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleFiltro = (genero, categoria) => {
    const query = new URLSearchParams();
    if (genero) query.append('genero', genero);
    if (categoria) query.append('categoria', categoria);
    navigate(`/?${query.toString()}`);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">KMI Tenis</Link>

      <div className="nav-menu">
        <div className="dropdown">
          <span>Hombre</span>
          <div className="dropdown-content">
            <button onClick={() => handleFiltro('Hombre', 'Zapatillas')}>Zapatillas</button>
            <button onClick={() => handleFiltro('Hombre', 'Ropa')}>Ropa</button>
            <button onClick={() => handleFiltro('Hombre', 'Accesorios')}>Accesorios</button>
          </div>
        </div>

        <div className="dropdown">
          <span>Mujer</span>
          <div className="dropdown-content">
            <button onClick={() => handleFiltro('Mujer', 'Zapatillas')}>Zapatillas</button>
            <button onClick={() => handleFiltro('Mujer', 'Ropa')}>Ropa</button>
            <button onClick={() => handleFiltro('Mujer', 'Accesorios')}>Accesorios</button>
          </div>
        </div>

        <div className="dropdown">
          <span>Niños</span>
          <div className="dropdown-content">
            <button onClick={() => handleFiltro('Niños', 'Zapatillas')}>Zapatillas</button>
            <button onClick={() => handleFiltro('Niños', 'Ropa')}>Ropa</button>
            <button onClick={() => handleFiltro('Niños', 'Accesorios')}>Accesorios</button>
          </div>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/carrito">Carrito ({cart.length})</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
