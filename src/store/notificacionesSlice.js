import { createSlice, nanoid } from '@reduxjs/toolkit';

// Cada notificación: { id, tipo: 'exito' | 'advertencia' | 'error', mensaje }
const notificacionesSlice = createSlice({
  name: 'notificaciones',
  initialState: [],
  reducers: {
    mostrarNotificacion: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ tipo, mensaje }) => ({
        payload: { id: nanoid(), tipo, mensaje },
      }),
    },
    ocultarNotificacion: (state, action) => state.filter((n) => n.id !== action.payload),
  },
});

export const { mostrarNotificacion, ocultarNotificacion } = notificacionesSlice.actions;
export default notificacionesSlice.reducer;