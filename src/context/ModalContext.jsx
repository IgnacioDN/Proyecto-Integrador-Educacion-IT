import { createContext, useCallback, useContext, useState } from 'react';

const ModalContext = createContext(null);

// Context API usado ahora exclusivamente para controlar un modal
// que puede activarse desde cualquier componente del proyecto.
export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null); // { titulo, mensaje, onConfirmar } | null

  const abrirModal = useCallback(({ titulo, mensaje, onConfirmar }) => {
    setModal({ titulo, mensaje, onConfirmar });
  }, []);

  const cerrarModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ modal, abrirModal, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);