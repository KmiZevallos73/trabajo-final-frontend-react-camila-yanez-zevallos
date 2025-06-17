import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [cred, setCred] = useState({ usuario: '', clave: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cred.usuario === 'admin' && cred.clave === '1234') {
      dispatch({ type: 'LOGIN' });
      navigate('/admin');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={cred.usuario}
          onChange={(e) => setCred({ ...cred, usuario: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={cred.clave}
          onChange={(e) => setCred({ ...cred, clave: e.target.value })}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
