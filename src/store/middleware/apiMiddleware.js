import { api } from '../../services/api';

// Middleware personalizado: intercepta cualquier acción que traiga
// action.meta.api, ejecuta la llamada HTTP correspondiente con Axios,
// y despacha la acción de éxito o error resultante.
//
// Así, los componentes ya no llaman a Axios directamente: solo despachan
// una acción "de intención" (ej. fetchProductos()) y este middleware se
// encarga de la parte asincrónica.
export const apiMiddleware = (storeAPI) => (next) => (action) => {
  const resultado = next(action);

  const apiConfig = action.meta?.api;
  if (!apiConfig) return resultado;

  const { method, url, data, onSuccess, onError, transformResponse } = apiConfig;

  return api
    .request({ method, url, data })
    .then((response) => {
      const payload = transformResponse ? transformResponse(response.data) : response.data;
      storeAPI.dispatch({ type: onSuccess, payload });
      return payload;
    })
    .catch((error) => {
      storeAPI.dispatch({ type: onError, payload: error.message, error: true });
      throw error;
    });
};