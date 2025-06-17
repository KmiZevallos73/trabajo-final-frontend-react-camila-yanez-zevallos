import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [usuario, setUsuario] = useState({
    nombre: 'Camila Zevallos',
    email: 'camila@example.com',
    direccion: 'Av. Principal 123, Lima',
  });

  // Simulamos carga desde almacenamiento o API local
  useEffect(() => {
    const data = localStorage.getItem('usuario');
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  return (
    <div className="perfil">
      <h2>Perfil del Usuario</h2>
      <div className="perfil-card">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Dirección:</strong> {usuario.direccion}</p>
      </div>
    </div>
  );
};

export default Profile;
