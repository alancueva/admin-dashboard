import api from '../api';
import {
  usuarioLogin,
  usuarioInsert,
  usuario,
  usuarioUpdate
} from '../../types/administracion/adminUsuario';

export const AdminUsuarioService = {
  logeo: async (dni: string, contrasena: string): Promise<usuarioLogin> => {
    const res = await api.post('/usuarios/getLoginUsuario', {
      dni,
      contrasena
    });
    return res.data as usuarioLogin;
  },

  insertar: async (data: usuarioInsert): Promise<void> => {
    await api.post('/usuarios/InsertarUsuario', data);
  },

  modificar: async (data: usuarioUpdate): Promise<void> => {
    await api.post('/usuarios/UpdateUsuario', data);
  },

  listar: async () => {
    const res = await api.get('/usuarios/getObtenerUsuario');
    return res.data as usuario[];
  },

  buscar: async (
    dni: string,
    nombreUsuario: string,
    id_rol: number,
    vigencia: string
  ): Promise<usuario> => {
    const res = await api.post('/usuarios/BuscarUsuario', {
      dni,
      nombreUsuario,
      id_rol,
      vigencia
    });
    return res.data as usuario;
  },

  obtenerPorId: async (id_usuario: number) => {
    const res = await api.get(`/usuarios/ObtenerUsuarioporid/${id_usuario}`);
    return res.data;
  }
};
