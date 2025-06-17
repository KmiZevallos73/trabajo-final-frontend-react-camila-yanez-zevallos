import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', imagen: '', id: null });

  const fetchProductos = () => {
    axios.get('http://localhost:3001/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = { nombre: form.nombre, precio: parseFloat(form.precio), imagen: form.imagen };

    if (form.id) {
      axios.put(`http://localhost:3001/productos/${form.id}`, producto)
        .then(() => {
          setForm({ nombre: '', precio: '', imagen: '', id: null });
          fetchProductos();
        });
    } else {
      axios.post('http://localhost:3001/productos', producto)
        .then(() => {
          setForm({ nombre: '', precio: '', imagen: '', id: null });
          fetchProductos();
        });
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      axios.delete(`http://localhost:3001/productos/${id}`)
        .then(fetchProductos);
    }
  };

  return (
    <div className="admin">
      <h2>Administración de Productos</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input name="imagen" placeholder="URL de imagen" value={form.imagen} onChange={handleChange} required />
        <button type="submit">{form.id ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio (S/.)</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td><img src={p.imagen} alt={p.nombre} width={50} /></td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
