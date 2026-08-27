import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementarCantidad,
  decrementarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
} from '../store/carritoSlice';
import { mostrarNotificacion } from '../store/notificacionesSlice';
import { crearPedido } from '../services/pedidosService';
import { useModal } from '../context/ModalContext';

export const Carrito = () => {
  const carrito = useSelector((state) => state.carrito.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { abrirModal } = useModal();
  const [enviandoPedido, setEnviandoPedido] = useState(false);

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio);

  // Total general de la compra: suma de todos los subtotales
  const total = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);

  const handleVaciarCarrito = () => {
    abrirModal({
      titulo: 'Vaciar carrito',
      mensaje: '¿Desea vaciar el carrito de compras? Esta acción no se puede deshacer.',
      onConfirmar: () => {
        dispatch(vaciarCarrito());
        dispatch(mostrarNotificacion({ tipo: 'error', mensaje: 'El carrito se vació.' }));
      },
    });
  };

  const handlePedir = async () => {
    setEnviandoPedido(true);
    try {
      await crearPedido({
        productos: carrito,
        total,
        fecha: new Date().toISOString(),
      });
      dispatch(vaciarCarrito());
      dispatch(mostrarNotificacion({ tipo: 'exito', mensaje: '¡Pedido realizado con éxito!' }));
      navigate('/catalogo');
    } catch (error) {
      dispatch(mostrarNotificacion({ tipo: 'error', mensaje: 'No se pudo enviar el pedido.' }));
    } finally {
      setEnviandoPedido(false);
    }
  };

  return (
    <section className="carrito-section">
      <div className="container">
        <h2 className="carrito-title">Carrito de compras</h2>

        {carrito.length === 0 ? (
          <div className="carrito-vacio">Carrito de compras vacío</div>
        ) : (
          <>
            <div className="carrito-table-wrapper">
              <table className="table carrito-table mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Foto</th>
                    <th>Precio unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.marca}</td>
                      <td>
                        <img src={producto.imagen} alt={producto.nombre} className="carrito-img" />
                      </td>
                      <td>{formatearPrecio(producto.precio)}</td>
                      <td>
                        <div className="cantidad-control">
                          <button
                            type="button"
                            className="btn-cantidad"
                            onClick={() => dispatch(decrementarCantidad(producto.id))}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <span className="cantidad-valor">{producto.cantidad}</span>
                          <button
                            type="button"
                            className="btn-cantidad"
                            onClick={() => dispatch(incrementarCantidad(producto.id))}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="fw-bold">{formatearPrecio(producto.precio * producto.cantidad)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-borrar"
                          onClick={() => dispatch(eliminarDelCarrito(producto.id))}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="carrito-total-row">
                    <td colSpan="5" className="text-end fw-bold">Total</td>
                    <td className="fw-bold">{formatearPrecio(total)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="d-flex gap-2 justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleVaciarCarrito}
                disabled={enviandoPedido}
              >
                Vaciar carrito
              </button>
              <button
                type="button"
                className="btn btn-primary mf-btn"
                onClick={handlePedir}
                disabled={enviandoPedido}
              >
                {enviandoPedido ? 'Enviando pedido...' : 'Pedir'}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};