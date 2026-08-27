import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from './Card';

export const Catalogo = () => {
  const { lista: productos, cargando, error } = useSelector((state) => state.productos);
  const texto = useSelector((state) => state.busqueda.texto);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto.toLowerCase())
  );

  return (
    <section className="catalogo-section">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="catalogo-title">Catálogo de Productos</h1>
          <p className="catalogo-subtitle">
            Mostrando las mejores ofertas: {productosFiltrados.length} disponibles
          </p>
        </div>

        {cargando ? (
          <div className="catalogo-vacio">Cargando productos...</div>
        ) : error ? (
          <div className="catalogo-vacio">{error}</div>
        ) : productos.length === 0 ? (
          <div className="catalogo-vacio">No hay productos</div>
        ) : productosFiltrados.length === 0 ? (
          <div className="catalogo-vacio">No se encontraron productos para "{texto}"</div>
        ) : (
          <div className="row g-4">
            {productosFiltrados.map((producto) => (
              <Card key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};