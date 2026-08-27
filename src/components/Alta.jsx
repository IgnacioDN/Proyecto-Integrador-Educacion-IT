import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  agregarProductoAction,
  editarProductoAction,
  borrarProductoAction,
} from '../store/productosActions';
import { mostrarNotificacion } from '../store/notificacionesSlice';
import { useModal } from '../context/ModalContext';

const formInicial = {
  nombre: '',
  precio: '',
  stock: '',
  marca: '',
  categoria: '',
  detalles: '',
  imagen: '',
  envio: false,
};

export const Alta = () => {
  const productos = useSelector((state) => state.productos.lista);
  const texto = useSelector((state) => state.busqueda.texto);
  const dispatch = useDispatch();
  const { abrirModal } = useModal();
  const [form, setForm] = useState(formInicial);
  const [editandoId, setEditandoId] = useState(null);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // El botón solo se habilita cuando todos los campos de texto/número están completos
  const camposCompletos =
    form.nombre.trim() !== '' &&
    form.precio !== '' &&
    form.stock !== '' &&
    form.marca.trim() !== '' &&
    form.categoria.trim() !== '' &&
    form.detalles.trim() !== '' &&
    form.imagen.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!camposCompletos) return;

    const datosProducto = {
      nombre: form.nombre,
      precio: Number(form.precio),
      stock: Number(form.stock),
      marca: form.marca,
      categoria: form.categoria,
      detalles: form.detalles,
      imagen: form.imagen,
      envio: form.envio,
    };

    if (editandoId !== null) {
      await dispatch(editarProductoAction(editandoId, datosProducto));
      dispatch(
        mostrarNotificacion({
          tipo: 'advertencia',
          mensaje: `Producto "${datosProducto.nombre}" editado.`,
        })
      );
      setEditandoId(null);
    } else {
      await dispatch(agregarProductoAction(datosProducto));
      dispatch(
        mostrarNotificacion({
          tipo: 'exito',
          mensaje: `Producto "${datosProducto.nombre}" agregado.`,
        })
      );
    }

    setForm(formInicial);
  };

  const handleEditar = (producto) => {
    setForm({
      nombre: producto.nombre,
      precio: String(producto.precio),
      stock: String(producto.stock),
      marca: producto.marca,
      categoria: producto.categoria,
      detalles: producto.detalles,
      imagen: producto.imagen,
      envio: producto.envio,
    });
    setEditandoId(producto.id);
  };

  const handleCancelar = () => {
    setForm(formInicial);
    setEditandoId(null);
  };

  // Usa el modal propio (Context API) en vez de window.confirm
  const handleBorrar = (producto) => {
    abrirModal({
      titulo: 'Borrar producto',
      mensaje: `¿Desea borrar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`,
      onConfirmar: async () => {
        await dispatch(borrarProductoAction(producto.id));
        dispatch(
          mostrarNotificacion({ tipo: 'error', mensaje: `Producto "${producto.nombre}" borrado.` })
        );
      },
    });
  };

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio);

  return (
    <section className="alta-section">
      <div className="container">
        <h2 className="alta-title">{editandoId !== null ? 'Editar producto' : 'Alta de productos'}</h2>

        <form className="alta-form" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="altaNombre">Nombre</label>
              <input
                type="text"
                id="altaNombre"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label" htmlFor="altaPrecio">Precio</label>
              <input
                type="number"
                id="altaPrecio"
                name="precio"
                className="form-control"
                min="0"
                value={form.precio}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label" htmlFor="altaStock">Stock</label>
              <input
                type="number"
                id="altaStock"
                name="stock"
                className="form-control"
                min="0"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="altaMarca">Marca</label>
              <input
                type="text"
                id="altaMarca"
                name="marca"
                className="form-control"
                value={form.marca}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="altaCategoria">Categoría</label>
              <input
                type="text"
                id="altaCategoria"
                name="categoria"
                className="form-control"
                value={form.categoria}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="altaDetalles">Detalles</label>
              <textarea
                id="altaDetalles"
                name="detalles"
                className="form-control"
                rows="2"
                value={form.detalles}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-md-8">
              <label className="form-label" htmlFor="altaImagen">Foto del producto (URL)</label>
              <input
                type="text"
                id="altaImagen"
                name="imagen"
                className="form-control"
                placeholder="https://..."
                value={form.imagen}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-4 d-flex align-items-end">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="altaEnvio"
                  name="envio"
                  className="form-check-input"
                  checked={form.envio}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="altaEnvio">
                  Ofrece envío
                </label>
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              {editandoId !== null ? (
                <>
                  <button type="submit" className="btn btn-primary mf-btn" disabled={!camposCompletos}>
                    Actualizar
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-cancelar" onClick={handleCancelar}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button type="submit" className="btn btn-primary mf-btn" disabled={!camposCompletos}>
                  Agregar producto
                </button>
              )}
            </div>
          </div>
        </form>

        <h3 className="alta-subtitle">Productos existentes</h3>

        {productos.length === 0 ? (
          <div className="catalogo-vacio">No hay productos</div>
        ) : productosFiltrados.length === 0 ? (
          <div className="catalogo-vacio">No se encontraron productos para "{texto}"</div>
        ) : (
          <div className="carrito-table-wrapper">
            <table className="table carrito-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Detalles</th>
                  <th>Foto</th>
                  <th>Envío</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto, index) => (
                  <tr key={producto.id} className={producto.id === editandoId ? 'fila-editando' : ''}>
                    <td>{index + 1}</td>
                    <td>{producto.nombre}</td>
                    <td>{formatearPrecio(producto.precio)}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.detalles}</td>
                    <td>
                      <img src={producto.imagen} alt={producto.nombre} className="carrito-img" />
                    </td>
                    <td>{producto.envio ? 'Sí' : 'No'}</td>
                    <td className="acciones-cell">
                      <button className="btn-editar" onClick={() => handleEditar(producto)}>
                        Editar
                      </button>
                      <button
                        className="btn-borrar"
                        disabled={editandoId !== null}
                        onClick={() => handleBorrar(producto)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};