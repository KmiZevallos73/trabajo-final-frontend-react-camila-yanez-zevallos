import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminProductos from './pages/AdminProductos';
import Login from './pages/Login';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import CartContext from './context/cartContext';
import AuthContext from './context/AuthContext';

import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';
import Resumen from './pages/Resumen';

import './App.css';

const App = () => {
  // Estado global del carrito
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Estado de autenticación
  const [authState, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });

  return (
    <AuthContext.Provider value={{ ...authState, dispatch: authDispatch }}>
      <CartContext.Provider value={{ cart, dispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAddToCart={(item) =>
                    dispatch({ type: 'ADD_TO_CART', payload: item })
                  }
                />
              }
            />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminProductos />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
