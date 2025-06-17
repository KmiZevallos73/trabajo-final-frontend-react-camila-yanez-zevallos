import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>KMI Tenis</h3>
          <p>Pasión por el deporte. Calidad en cada servicio.</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Correo: contacto@KMItenis.com</p>
          <p>Teléfono: +51 999 999 999</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} KMI Tenis. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
