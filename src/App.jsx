import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { Header } from './components/Header';
import { Carrito } from './components/Carrito';
import { Alta } from './components/Alta';
import { Catalogo } from './components/Catalogo';
import { Footer } from './components/Footer';
import { ConfirmModal } from './components/ConfirmModal';
import { Notificaciones } from './components/Notificaciones';
import { fetchProductos } from './store/productosActions';

function App() {
  const dispatch = useDispatch();

  // Carga inicial del catálogo desde mockAPI (vía Redux)
  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  return (
    <ModalProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Header />
          <main className="flex-shrink-0">
            <Routes>
              <Route path="/" element={<Navigate to="/catalogo" replace />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/alta" element={<Alta />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ConfirmModal />
        <Notificaciones />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;