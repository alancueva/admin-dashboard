export interface usuario {
  id_usuario: number;
  rol: string;
  usu_dni: string;
  usu_nombre: string;
  usu_apellido_paterno: string;
  usu_apellido_materno: string;
  usu_datos_completos: string;
  usu_correo: string;
  usu_vigencia: string;
}

export interface usuarioRecuperar {
  id_usuario: number;
  id_rol: number;
  rol: string;
  usu_dni: string;
  usu_nombre: string;
  usu_apellido_paterno: string;
  usu_apellido_materno: string;
  usu_numero_tel: string;
  usu_correo: string;
  usu_contrasenia: string;
  usu_vigencia: string;
  usuario_creacion: string;
  fecha_creacion: string;
  usuario_actualizacion: string;
  fecha_actualizacion: string;
  usuario_baja: string;
  fecha_baja: string;
}

export interface usuarioLogin {
  id_usuario: number;
  id_rol: number;
  rol: string;
  es_super_admin: Boolean;
  id_tipo_negocio: number;
  tipo_negocio: string;
  id_organizaciones: number;
  organizacion: string;
  usu_dni: string;
  usu_nombre: string;
  usu_apellido_paterno: string;
  usu_apellido_materno: string;
  usu_datos_completos: string;
  usu_numero_tel: string;
  usu_correo: string;
  usu_vigencia: string;
}

export interface usuarioInsert {
  id_rol: number;
  id_organizaciones: number;
  usu_dni: string;
  usu_nombre: string;
  usu_apellido_materno: string;
  usu_apellido_paterno: string;
  usu_contrasenia: string;
  usu_numero_tel: string;
  usu_correo: string;
  usu_vigencia: string;
  usuarioCreacion: string;
}

export interface usuarioUpdate extends usuarioInsert {
  id_usuarios: number;
}
