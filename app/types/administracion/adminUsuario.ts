export interface usuario {
  id_usuarios: number;
  rol: string;
  tipo_negocio: string;
  organizacion: string;
  dni: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  datos_completos: string;
  email: string;
  //telefono: string;
  vigencia: string;
}

export interface usuarioLogin {
  id_usuarios: number;
  id_rol: number;
  rol: string;
  id_tipo_negocio: number;
  tipo_negocio: string;
  id_organizaciones: number;
  organizacion: string;
  dni: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  datos_completos: string;
  email: string;
  vigencia: string;
}

export interface usuarioInsert {
  id_rol: number;
  id_organizaciones: number;
  dni: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  contrasenia: string;
  // vigencia: string;
  usuarioCreacion: string;
}

export interface usuarioUpdate extends usuarioInsert {
  id_usuarios: number;
}
