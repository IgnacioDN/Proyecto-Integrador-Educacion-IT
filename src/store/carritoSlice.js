import { createSlice } from '@reduxjs/toolkit';

export const CARRITO_STORAGE_KEY = 'nachodnapp_carrito';

const cargarCarritoInicial = () => {
  try {
    const guardado = localStorage.getItem(CARRITO_STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
};

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    items: cargarCarritoInicial(),
  },
  reducers: {
    // Si el producto ya está en el carrito, incrementa su cantidad;
    // si es la primera vez, lo agrega con cantidad: 1
    agregarAlCarrito: (state, action) => {
      const producto = action.payload;
      const existente = state.items.find((item) => item.id === producto.id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        state.items.push({ ...producto, cantidad: 1 });
      }
    },
    incrementarCantidad: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.cantidad += 1;
    },
    decrementarCantidad: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.cantidad = Math.max(1, item.cantidad - 1);
    },
    eliminarDelCarrito: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.items = [];
    },
  },
});

export const {
  agregarAlCarrito,
  incrementarCantidad,
  decrementarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
} = carritoSlice.actions;

export default carritoSlice.reducer;