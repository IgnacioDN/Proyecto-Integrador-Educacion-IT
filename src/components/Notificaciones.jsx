import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ocultarNotificacion } from '../store/notificacionesSlice';

export const Notificaciones = () => {
  const notificaciones = useSelector((state) => state.notificaciones);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notificaciones.length === 0) return undefined;
    const timers = notificaciones.map((n) =>
      setTimeout(() => dispatch(ocultarNotificacion(n.id)), 3500)
    );
    return () => timers.forEach(clearTimeout);
  }, [notificaciones, dispatch]);

  if (notificaciones.length === 0) return null;

  return (
    <div className="mf-toast-container">
      {notificaciones.map((n) => (
        <div key={n.id} className={`mf-toast mf-toast--${n.tipo}`}>
          {n.mensaje}
        </div>
      ))}
    </div>
  );
};