import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agregarAlCarrito } from '../store/carritoSlice';
import { mostrarNotificacion } from '../store/notificacionesSlice';

export const Card = ({ producto }) => {
  const dispatch = useDispatch();
  const itemsCarrito = useSelector((state) => state.carrito.items);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio);
  };

  const handleAgregarAlCarrito = () => {
    const yaEstaba = itemsCarrito.some((item) => item.id === producto.id);
    dispatch(agregarAlCarrito(producto));
    dispatch(
      mostrarNotificacion(
        yaEstaba
          ? {
              tipo: 'advertencia',
              mensaje: `Sumaste otra unidad de "${producto.nombre}" al carrito.`,
            }
          : { tipo: 'exito', mensaje: `"${producto.nombre}" se agregó al carrito.` }
      )
    );
  };

  return (
    // col-6 (en vez de col-12 col-sm-6) para que el catálogo muestre
    // 2 productos por fila desde el celular más chico
    <div className="col-6 col-lg-3 d-flex">
      <div className="card mf-card h-100 shadow-sm w-100">
        <div className="mf-card-image">
          <img src={producto.imagen} className="mf-card-img" alt={producto.nombre} />
          <span className="badge bg-primary mf-badge">{producto.categoria}</span>
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-dark fs-6 fw-bold">{producto.nombre}</h5>
            <p className="card-text text-muted small">{producto.detalles}</p>
          </div>
          <div className="mt-3">
            <h4 className="text-danger mb-3 fw-bold">{formatearPrecio(producto.precio)}</h4>
            <button className="btn btn-primary w-100 mf-btn" onClick={handleAgregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};