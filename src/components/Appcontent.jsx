import { createContext } from 'react';

// Contexto global: expone el catálogo de productos y el carrito de compras
// junto con las funciones para modificarlos, disponibles en todo el árbol.
export const AppContext = createContext(null);