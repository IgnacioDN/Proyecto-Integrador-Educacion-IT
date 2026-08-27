import { api } from './api';

// En mockAPI el campo de la foto se llama "foto", pero en el resto de la app
// (Card, Carrito, Alta) usamos "imagen". Estas funciones traducen entre ambos
// formatos para no tener que tocar los componentes ya hechos.
const mapDesdeApi = (producto) => {
  const { foto, ...resto } = producto;
  return { ...resto, imagen: foto };
};

const mapHaciaApi = (producto) => {
  const { imagen, ...resto } = producto;
  return { ...resto, foto: imagen };
};

// Trae todos los productos existentes en mockAPI
export const obtenerProductos = () =>
  api.get('/productos').then((res) => res.data.map(mapDesdeApi));

// Crea un producto nuevo (mockAPI genera el id automáticamente)
export const crearProducto = (producto) =>
  api.post('/productos', mapHaciaApi(producto)).then((res) => mapDesdeApi(res.data));

// Actualiza un producto existente por id
export const actualizarProducto = (id, datos) =>
  api.put(`/productos/${id}`, mapHaciaApi(datos)).then((res) => mapDesdeApi(res.data));

// Elimina un producto por id
export const eliminarProducto = (id) => api.delete(`/productos/${id}`);