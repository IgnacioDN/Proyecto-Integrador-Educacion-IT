import { api } from './api';

// Envía un pedido completo (productos del carrito + total + fecha) a mockAPI
export const crearPedido = (pedido) =>
  api.post('/pedidos', pedido).then((res) => res.data);