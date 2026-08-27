import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from './Logo';
import { setTexto, limpiarTexto } from '../store/busquedaSlice';

export const NavBar = () => {
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const location = useLocation();
  const dispatch = useDispatch();
  const textoBusqueda = useSelector((state) => state.busqueda.texto);
  const cantidadCarrito = useSelector((state) =>
    state.carrito.items.reduce((acumulado, item) => acumulado + item.cantidad, 0)
  );

  // El buscador filtra Catálogo y Alta; al cambiar de ruta se limpia el texto
  useEffect(() => {
    dispatch(limpiarTexto());
  }, [location.pathname, dispatch]);

  const mostrarBuscador = location.pathname !== '/carrito';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Logo />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className={linkClass} to="/catalogo">Catálogo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/alta">Alta</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/carrito">Carrito</NavLink>
            </li>
          </ul>

          {mostrarBuscador && (
            <input
              type="search"
              className="form-control form-control-sm me-3"
              style={{ maxWidth: '220px' }}
              placeholder="Buscar productos..."
              value={textoBusqueda}
              onChange={(e) => dispatch(setTexto(e.target.value))}
              aria-label="Buscar productos"
            />
          )}

          <div className="d-flex align-items-center gap-3">
            <NavLink className="nav-icon position-relative" to="/carrito" aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="cart-badge">{cantidadCarrito}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};