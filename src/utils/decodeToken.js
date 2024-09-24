import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    console.log(token);
    return jwtDecode(token);
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
};