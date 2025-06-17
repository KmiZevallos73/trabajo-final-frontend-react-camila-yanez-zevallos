import React, { useContext, useState } from 'react';
import CartContext from '../context/cartContext';

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [datos, setDatos] = useState({ nombre: '', direccion: '', telefono: '' });
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    console.log('Pedido:', {
      cliente: datos,
      productos: cart,
    });
    setPedidoEnviado(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  if (pedidoEnviado) {
    return <h2>¡Gracias por tu compra, {datos.nombre}!</h2>;
  }

  return (
    <div className="checkout">
      <h2>Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="form-checkout">
        <input type="text" name="nombre" placeholder="Nombre completo" value={datos.nombre} onChange={handleChange} required />
        <input type="text" name="direccion" placeholder="Dirección de envío" value={datos.direccion} onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={datos.telefono} onChange={handleChange} required />
        <button type="submit">Confirmar Pedido</button>
      </form>
    </div>
  );
};

export default Checkout;
