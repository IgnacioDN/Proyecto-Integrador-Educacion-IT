import {
  fetchRequest,
  fetchSuccess,
  fetchError,
  agregarSuccess,
  editarSuccess,
  borrarSuccess,
} from './productosSlice';

// mockAPI guarda la imagen en el campo "foto"; en el resto de la app
// (Card, Carrito, Alta) usamos "imagen". Estas funciones traducen entre
// ambos formatos, igual que hacía productosService.js antes.
const mapDesdeApi = (producto) => {
  const { foto, ...resto } = producto;
  return { ...resto, imagen: foto };
};

const mapHaciaApi = (producto) => {
  const { imagen, ...resto } = producto;
  return { ...resto, foto: imagen };
};

// Trae el catálogo completo desde mockAPI
export const fetchProductos = () => ({
  type: fetchRequest.type,
  meta: {
    api: {
      method: 'get',
      url: '/productos',
      onSuccess: fetchSuccess.type,
      onError: fetchError.type,
      transformResponse: (data) => data.map(mapDesdeApi),
    },
  },
});

// Crea un producto nuevo en mockAPI
export const agregarProductoAction = (datos) => ({
  type: 'productos/agregarRequest',
  meta: {
    api: {
      method: 'post',
      url: '/productos',
      data: mapHaciaApi(datos),
      onSuccess: agregarSuccess.type,
      onError: fetchError.type,
      transformResponse: mapDesdeApi,
    },
  },
});

// Edita un producto existente en mockAPI
export const editarProductoAction = (id, datos) => ({
  type: 'productos/editarRequest',
  meta: {
    api: {
      method: 'put',
      url: `/productos/${id}`,
      data: mapHaciaApi(datos),
      onSuccess: editarSuccess.type,
      onError: fetchError.type,
      transformResponse: mapDesdeApi,
    },
  },
});

// Borra un producto en mockAPI
export const borrarProductoAction = (id) => ({
  type: 'productos/borrarRequest',
  meta: {
    api: {
      method: 'delete',
      url: `/productos/${id}`,
      onSuccess: borrarSuccess.type,
      onError: fetchError.type,
      transformResponse: () => id,
    },
  },
});