import { configureStore } from '@reduxjs/toolkit';
import productosReducer from './productosSlice';
import carritoReducer, { CARRITO_STORAGE_KEY } from './carritoSlice';
import notificacionesReducer from './notificacionesSlice';
import busquedaReducer from './busquedaSlice';
import { apiMiddleware } from './middleware/apiMiddleware';

export const store = configureStore({
  reducer: {
    productos: productosReducer,
    carrito: carritoReducer,
    notificaciones: notificacionesReducer,
    busqueda: busquedaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
});

// Persistimos el carrito en localStorage ante cualquier cambio de estado,
// así al reiniciar la página no se pierde.
store.subscribe(() => {
  const { carrito } = store.getState();
  localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito.items));
});