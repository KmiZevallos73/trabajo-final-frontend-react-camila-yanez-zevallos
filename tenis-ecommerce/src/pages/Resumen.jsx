import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Resumen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { total, costoEnvio, nota, envio, productos } = location.state || {};

  useEffect(() => {
    if (!productos || productos.length === 0 || total === undefined) {
      navigate('/');
    }
  }, []);

  return (
    <div className="resumen-container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pedido se ha procesado con éxito. A continuación el resumen:</p>

      <div className="resumen-bloque" style={{ marginTop: '1.5rem' }}>
        <h3>Productos:</h3>
        <ul>
          {productos?.map(item => (
            <li key={item.id} style={{ marginBottom: '0.5rem' }}>
              {item.nombre} × {item.cantidad} = <strong>S/. {(item.precio * item.cantidad).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="resumen-bloque" style={{ marginTop: '1.5rem' }}>
        <h3>Envío:</h3>
        <p>
          {envio.provincia}, {envio.pais} - Código postal: {envio.codigoPostal}
        </p>
        <p><strong>Costo envío:</strong> S/. {costoEnvio?.toFixed(2)}</p>
      </div>

      <div className="resumen-bloque" style={{ marginTop: '1.5rem' }}>
        <h3>Nota:</h3>
        <p>{nota?.trim() ? nota : "Sin nota agregada"}</p>
      </div>

      <div className="resumen-bloque" style={{ marginTop: '1.5rem' }}>
        <h3>Total final:</h3>
        <p><strong>S/. {total?.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};

export default Resumen;
