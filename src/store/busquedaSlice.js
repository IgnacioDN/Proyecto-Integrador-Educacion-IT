import { createSlice } from '@reduxjs/toolkit';

const busquedaSlice = createSlice({
  name: 'busqueda',
  initialState: {
    texto: '',
  },
  reducers: {
    setTexto: (state, action) => {
      state.texto = action.payload;
    },
    limpiarTexto: (state) => {
      state.texto = '';
    },
  },
});

export const { setTexto, limpiarTexto } = busquedaSlice.actions;
export default busquedaSlice.reducer;