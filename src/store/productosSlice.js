import { createSlice } from '@reduxjs/toolkit';

const productosSlice = createSlice({
  name: 'productos',
  initialState: {
    lista: [],
    cargando: true,
    error: null,
  },
  reducers: {
    fetchRequest: (state) => {
      state.cargando = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.lista = action.payload;
      state.cargando = false;
    },
    fetchError: (state) => {
      state.cargando = false;
      state.error = 'No se pudieron cargar los productos. Reintentá más tarde.';
    },
    agregarSuccess: (state, action) => {
      state.lista.push(action.payload);
    },
    editarSuccess: (state, action) => {
      const index = state.lista.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.lista[index] = action.payload;
    },
    borrarSuccess: (state, action) => {
      state.lista = state.lista.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  fetchRequest,
  fetchSuccess,
  fetchError,
  agregarSuccess,
  editarSuccess,
  borrarSuccess,
} = productosSlice.actions;

export default productosSlice.reducer;