import React, { useContext, useState } from 'react';
import CartContext from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const provinciasEnvio = {
  "Lima": 10,
  "Arequipa": 15,
  "Cusco": 18,
  "La Libertad": 14,
  "Piura": 16,
  "Amazonas": 20,
  "Otro": 25
};

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [envio, setEnvio] = useState({
    pais: 'Perú',
    provincia: '',
    codigoPostal: ''
  });
  const [nota, setNota] = useState('');
  const [costoEnvio, setCostoEnvio] = useState(0);

  const navigate = useNavigate();

  const handleCantidad = (id, tipo) => {
    dispatch({ type: tipo, payload: id });
  };

  const handleEliminar = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const calcularSubtotal = () => {
    return cart.reduce((acc, item) => acc + parseFloat(item.precio || 0) * item.cantidad, 0);
  };

  const estimarEnvio = () => {
    const costo = provinciasEnvio[envio.provincia] || provinciasEnvio["Otro"];
    setCostoEnvio(costo);
  };

  const total = calcularSubtotal() + costoEnvio;

  const handleCheckout = async () => {
    const nuevaOrden = {
      id: uuidv4(),
      fecha: new Date().toISOString(),
      productos: cart,
      envio,
      nota,
      costoEnvio,
      total
    };

    try {
      await axios.post('http://localhost:3001/ordenes', nuevaOrden);
      navigate('/resumen', {
        state: nuevaOrden
      });
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Hubo un error al procesar tu pedido.');
    }
  };

  return (
    <div className="cart-container">
      <h1>CARRITO</h1>
      <div className="cart-layout">
        <div className="cart-left">
          <div className="cart-header">
            <span>PRODUCTO</span>
            <span>CANTIDAD</span>
            <span>TOTAL</span>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <img src={item.imagen} alt={item.nombre} />
                <div>
                  <h4>{item.nombre}</h4>
                  <p>S/. {parseFloat(item.precio || 0).toFixed(2)}</p>
                  <button className="eliminar" onClick={() => handleEliminar(item.id)}>Eliminar</button>
                </div>
              </div>

              <div className="item-cantidad">
                <button onClick={() => handleCantidad(item.id, 'DECREASE_QUANTITY')}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => handleCantidad(item.id, 'INCREASE_QUANTITY')}>+</button>
              </div>

              <div className="item-total">
                S/. {(parseFloat(item.precio || 0) * item.cantidad).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="envio-form">
            <h3>ESTIMACIÓN DE ENVÍO</h3>
            <div className="envio-inputs">
              <select value={envio.pais} disabled>
                <option>Perú</option>
              </select>
              <select value={envio.provincia} onChange={(e) => setEnvio({ ...envio, provincia: e.target.value })}>
                <option value="">Seleccionar provincia</option>
                {Object.keys(provinciasEnvio).map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Código postal"
                value={envio.codigoPostal}
                onChange={(e) => setEnvio({ ...envio, codigoPostal: e.target.value })}
              />
            </div>
            <button className="estimar-btn" onClick={estimarEnvio}>ESTIMAR ENVÍO</button>
          </div>
        </div>

        <div className="cart-summary">
          <h3>TOTAL</h3>
          <p>Subtotal: S/. {calcularSubtotal().toFixed(2)}</p>
          <p>Envío: S/. {costoEnvio.toFixed(2)}</p>
          <p><strong>Total: S/. {total.toFixed(2)}</strong></p>

          <textarea
            placeholder="Añadir nota de pedido (opcional)"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          ></textarea>

          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
