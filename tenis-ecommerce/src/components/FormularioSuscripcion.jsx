import React, { useState } from 'react';

const FormularioSuscripcion = () => {
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías conectar con una API real
    console.log('Datos enviados:', form);
    setEnviado(true);
    setForm({ nombre: '', email: '' });
  };

  return (
    <div className="form-suscripcion">
      <h2>Recibe ofertas y novedades exclusivas</h2>
      {enviado ? (
        <p className="mensaje-exito">¡Gracias por suscribirte! Pronto recibirás novedades.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={form.nombre}
            required
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default FormularioSuscripcion;
