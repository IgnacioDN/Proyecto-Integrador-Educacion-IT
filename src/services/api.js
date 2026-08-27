import axios from 'axios';

// URL base de tu proyecto en mockAPI (Proyecto Integrador React)
const BASE_URL = 'https://6a909c81ff2484963a5e284e.mockapi.io';

export const api = axios.create({
  baseURL: BASE_URL,
});