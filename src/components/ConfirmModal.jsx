import React from 'react';
import { useModal } from '../context/ModalContext';

export const ConfirmModal = () => {
  const { modal, cerrarModal } = useModal();

  if (!modal) return null;

  const handleConfirmar = () => {
    modal.onConfirmar();
    cerrarModal();
  };

  return (
    <div className="mf-modal-overlay" role="dialog" aria-modal="true">
      <div className="mf-modal-box">
        <h5>{modal.titulo}</h5>
        <p className="text-muted mb-0">{modal.mensaje}</p>
        <div className="d-flex gap-2 justify-content-end mt-4">
          <button type="button" className="btn btn-outline-secondary" onClick={cerrarModal}>
            Cancelar
          </button>
          <button type="button" className="btn btn-danger" onClick={handleConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};