import React from 'react';

export const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="mf-footer mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="mf-footer-brand">
              Nacho<strong>DnApp</strong>
            </h5>
            <p className="mf-footer-text">
              Electro, tecnología y hogar con las mejores cuotas. Proyecto integrador de
              Educación IT.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="mf-footer-heading">Categorías</h6>
            <ul className="mf-footer-links">
              <li><a href="#">Electro</a></li>
              <li><a href="#">Tecno</a></li>
              <li><a href="#">Ofertas</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="mf-footer-heading">Ayuda</h6>
            <ul className="mf-footer-links">
              <li><a href="#">Medios de pago</a></li>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Cambios y devoluciones</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="mf-footer-heading">Contacto</h6>
            <ul className="mf-footer-links">
              <li><a href="#">Atención al cliente</a></li>
              <li><a href="#">Sucursales</a></li>
            </ul>
          </div>
        </div>

        <div className="mf-footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0">© {anioActual} NachoDnApp - Proyecto Integrador Educación IT.</p>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            <a href="#" className="mf-social" aria-label="Instagram">IG</a>
            <a href="#" className="mf-social" aria-label="Facebook">FB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};