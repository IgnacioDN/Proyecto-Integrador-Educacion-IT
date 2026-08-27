import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export const Logo = () => {
  return (
    <NavLink to="/catalogo" className="navbar-brand d-flex align-items-center gap-2">
      <img src={logoImg} className="logo-icon" alt="NachoDnApp" />
      <span className="logo-text">
        Nacho<strong>DnApp</strong>
      </span>
    </NavLink>
  );
};