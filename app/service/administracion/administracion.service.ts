import api from '../api';
import { Administracion } from '../../types/administracion/administracion';

export const getAdministracion = async (): Promise<Administracion[]> => {
  const response = await api.get('/Administracion/getConteoAdministrativo');
  return response.data;
};
